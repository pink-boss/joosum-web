import { ChangeEvent, useCallback, useRef, useState } from 'react';

import Checkbox from '@/components/checkbox';
import LinkEmpty from '@/components/link-empty';
import LoadMoreButton from '@/components/load-more-button';
import Loader from '@/components/loader';

import { usePaginationWithDeps } from '@/hooks/utils';
import { useCheckLink } from '@/hooks/zustand';
import { LinkFilterValues, LinkSortState } from '@/libs/zustand/schema';
import { useDialogStore } from '@/libs/zustand/store';

import { Folder } from '@/types/folder.types';
import { TLinkQueryResult } from '@/types/link.types';

import LinkListEditHeader from './link-list-edit-header';
import LinkListEditToolbar from './link-list-edit-toolbar';
import LinkListLinkCard from './link-list-link-card';
import ViewToolbar from './link-list-view-toolbar';

interface Props {
  defaultEditMode?: boolean;
  folderId?: Folder['linkBookId'];
  linkFilter: LinkFilterValues;
  linkSort: LinkSortState;
  queryResult: TLinkQueryResult;
  type: 'linkList' | 'searchResult';
}

// 정렬, 편집/편집 종료, 링크 리스트, 케밥
export default function LinkList({ defaultEditMode = false, type, linkSort, linkFilter, queryResult }: Props) {
  const { openDeleteLink, openReassignFolder } = useDialogStore();
  const { cachedLinks, setCachedLink, setAllLinks } = useCheckLink();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [editMode, setEditMode] = useState(defaultEditMode);

  const { data, isPending } = queryResult;

  const { currentItems, hasNextPage, loadNextPage, totalItems } = usePaginationWithDeps({
    items: data,
    itemsPerPage: 30,
    linkFilter,
    linkSort,
    scrollTargetRef: scrollContainerRef,
  });

  const handleChangeToolbarMode = useCallback(() => {
    if (cachedLinks.size) {
      setAllLinks(false);
    }
    setEditMode((prev) => !prev);
  }, [cachedLinks.size, setAllLinks]);

  const handleAllCheckLinks = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setAllLinks(!!e.target.checked, currentItems);
    },
    [setAllLinks, currentItems],
  );

  const handleCheckLink = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setCachedLink(e.target.value);
    },
    [setCachedLink],
  );

  const handleDeleteLinks = useCallback(() => {
    if (cachedLinks.size) {
      openDeleteLink(true, `deleteLink_editOn_${type}`);
    }
  }, [cachedLinks.size, openDeleteLink, type]);

  const handleChangeFolder = useCallback(() => {
    if (cachedLinks.size) {
      openReassignFolder(true, `moveFolder_editOn_${type}`);
    }
  }, [cachedLinks.size, openReassignFolder, type]);

  return (
    <div className="flex h-full flex-1 flex-col gap-1 overflow-hidden">
      <div className="flex items-center">
        {!editMode ? (
          <>
            <div className="text-lg font-semibold text-gray-ink">{currentItems.length}개 주섬</div>
            {/* 정렬, 편집 */}
            <ViewToolbar
              editDataTestId={`editOn_${type}`}
              linkSort={linkSort}
              sortDataTestId={`sortby_${type}`}
              onChangeMode={handleChangeToolbarMode}
            />
          </>
        ) : (
          <>
            {/* 모두 선택 및 선택된 항목 수 */}
            <LinkListEditHeader
              cachedLinks={cachedLinks}
              dataTestId={`checkAll_editOn_${type}`}
              totalCount={currentItems.length}
              onAllCheckLinks={handleAllCheckLinks}
            />
            {/* 삭제, 폴더이동, 편집종료 */}
            <LinkListEditToolbar
              type={type}
              onChangeFolder={handleChangeFolder}
              onChangeMode={handleChangeToolbarMode}
              onDeleteLinks={handleDeleteLinks}
            />
          </>
        )}
      </div>
      {isPending ? (
        <Loader />
      ) : currentItems?.length ? (
        <div className="flex h-full flex-1 flex-col overflow-hidden">
          <div ref={scrollContainerRef} className="flex-1 overflow-y-auto pr-2">
            {currentItems.map((link, index) => (
              <div key={`link-${index}`} className="flex items-start gap-2 py-5">
                {editMode && (
                  // 단일 선택
                  <Checkbox
                    checked={cachedLinks.has(link.linkId)}
                    dataTestId={`checkLink_editOn_${type}`}
                    value={link.linkId}
                    onChange={handleCheckLink}
                  />
                )}
                {/* 검색결과 링크 클릭, 케밥 클릭 */}
                <LinkListLinkCard
                  index={index}
                  kebabDataTestId={`kebab_${type}`}
                  link={link}
                  linkDataTestId={`link_${type}`}
                  type={type}
                />
              </div>
            ))}
            {hasNextPage && (
              <LoadMoreButton
                iconAlt="더 보기"
                iconSrc="/icons/icon-down.png"
                remainingCount={totalItems - currentItems.length}
                variant="list"
                onClick={loadNextPage}
              />
            )}
          </div>
        </div>
      ) : (
        <LinkEmpty unread={linkFilter.unread} />
      )}
    </div>
  );
}
