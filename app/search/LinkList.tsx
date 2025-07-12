import { ChangeEvent, useState } from "react";

import Checkbox from "@/components/Checkbox";
import EmptyLinks from "@/components/EmptyLinks";
import Loading from "@/components/Loading";
import useCheckLink from "@/hooks/link/useCheckLink";
import { useQueryLinks } from "@/hooks/link/useQuerySearchLinks";
import { LinkFilterValues } from "@/store/link-filter/schema";
import { LinkSortState } from "@/store/link-sort/schema";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { LinkBook } from "@/types/linkBook.types";

import EditHeader from "../link-book/[title]/link-list/EditHeader";
import EditToolbar from "../link-book/[title]/link-list/EditToolbar";
import LinkComponent from "../link-book/[title]/link-list/LinkCard";
import ViewToolbar from "../link-book/[title]/link-list/ViewToolbar";

type InputProps = {
  defaultEditMode?: boolean;
  linkSort: LinkSortState;
  linkFilter: LinkFilterValues;
  linkBookId?: LinkBook["linkBookId"];
};

export default function LinkList({
  defaultEditMode = false,
  linkSort,
  linkFilter,
  linkBookId,
}: InputProps) {
  const { openDeleteLink, openReassignLinkBook } = useOpenDialogStore();
  const [editMode, setEditMode] = useState(defaultEditMode);
  const { cachedLinks, setCachedLink, setAllLinks } = useCheckLink();
  const { data, isPending } = useQueryLinks({
    linkSort,
    linkFilter,
    linkBookId,
  });
  const totalCount = data.length;

  const handleChangeToolbarMode = () => {
    if (cachedLinks.size) {
      setAllLinks(false);
    }
    setEditMode((prev) => !prev);
  };

  const handleAllCheckLinks = (e: ChangeEvent<HTMLInputElement>) => {
    setAllLinks(!!e.target.checked, data);
  };

  const handleCheckLink = (e: ChangeEvent<HTMLInputElement>) => {
    setCachedLink(e.target.value);
  };

  const handleDeleteLinks = () => {
    if (cachedLinks.size) {
      openDeleteLink(true);
    }
  };
  const handleChangeFolder = () => {
    if (cachedLinks.size) {
      openReassignLinkBook(true);
    }
  };

  return (
    <div className="flex h-full flex-1 flex-col gap-1 overflow-hidden">
      <div className="flex items-center">
        {!editMode ? (
          <>
            <div className="text-lg font-semibold text-gray-ink">
              {totalCount}개 주섬
            </div>
            <ViewToolbar
              linkSort={linkSort}
              handleChangeMode={handleChangeToolbarMode}
            />
          </>
        ) : (
          <>
            <EditHeader
              totalCount={totalCount}
              cachedLinks={cachedLinks}
              handleAllCheckLinks={handleAllCheckLinks}
            />
            <EditToolbar
              handleDeleteLinks={handleDeleteLinks}
              handleChangeFolder={handleChangeFolder}
              handleChangeMode={handleChangeToolbarMode}
            />
          </>
        )}
      </div>
      {isPending ? (
        <Loading />
      ) : data.length ? (
        <div
          data-testid="link-list"
          role="list"
          className="flex-1 overflow-auto"
        >
          {data.map((link, index) => (
            <div
              key={`link-${index}`}
              role="listitem"
              className="flex items-start gap-2 py-5"
            >
              {editMode && (
                <Checkbox
                  onChange={handleCheckLink}
                  value={link.linkId}
                  checked={cachedLinks.has(link.linkId)}
                />
              )}
              <LinkComponent link={link} index={index} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyLinks unread={linkFilter.unread} />
      )}
    </div>
  );
}
