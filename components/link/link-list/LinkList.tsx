import { sendGTMEvent } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import { ChangeEvent, useState, useRef } from "react";

import Checkbox from "@/components/Checkbox";
import EmptyLinks from "@/components/EmptyLinks";
import LoadMoreButton from "@/components/link/link-list/LoadMoreButton";
import Loading from "@/components/Loading";
import useCheckLink from "@/hooks/link/useCheckLink";
import { usePaginationWithDeps } from "@/hooks/usePaginationWithDeps";
import { LinkFilterValues } from "@/store/link-filter/schema";
import { LinkSortState } from "@/store/link-sort/schema";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { TLinkQueryResult } from "@/types/link.types";
import { LinkBook } from "@/types/linkBook.types";

import EditHeader from "./EditHeader";
import EditToolbar from "./EditToolbar";
import LinkComponent from "./LinkCard";
import ViewToolbar from "./ViewToolbar";

type InputProps = {
  defaultEditMode?: boolean;
  linkSort: LinkSortState;
  linkFilter: LinkFilterValues;
  queryResult: TLinkQueryResult;
  linkBookId?: LinkBook["linkBookId"];
};

export default function LinkList({
  defaultEditMode = false,
  linkSort,
  linkFilter,
  queryResult,
}: InputProps) {
  const { openDeleteLink, openReassignLinkBook } = useOpenDialogStore();
  const [editMode, setEditMode] = useState(defaultEditMode);
  const { cachedLinks, setCachedLink, setAllLinks } = useCheckLink();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { data, isPending } = queryResult;

  const { currentItems, hasNextPage, loadNextPage, totalItems } =
    usePaginationWithDeps({
      items: data,
      itemsPerPage: 30,
      linkFilter,
      linkSort,
      scrollTargetRef: scrollContainerRef,
    });

  const pathname = usePathname();

  const handleChangeToolbarMode = () => {
    if (cachedLinks.size) {
      setAllLinks(false);
    }
    setEditMode((prev) => {
      const editOnEvent =
        pathname === "/search"
          ? "click.editOn_searchResult"
          : "click.editOn_linkList";
      const editOffEvent =
        pathname === "/search"
          ? "click.editOff_searchResult"
          : "click.editOff_linkList";
      sendGTMEvent({
        event: prev ? editOffEvent : editOnEvent,
      });
      return !prev;
    });
  };

  const handleAllCheckLinks = (e: ChangeEvent<HTMLInputElement>) => {
    sendGTMEvent({
      event:
        pathname === "/search"
          ? "click.checkAll_editOn_searchResult"
          : "click.checkAll_editOn_linkList",
    });
    setAllLinks(!!e.target.checked, currentItems);
  };

  const handleCheckLink = (e: ChangeEvent<HTMLInputElement>) => {
    sendGTMEvent({
      event:
        pathname === "/search"
          ? "click.checkLink_editOn_searchResult"
          : "click.checkLink_editOn_linkList",
    });
    setCachedLink(e.target.value);
  };

  const handleDeleteLinks = () => {
    sendGTMEvent({
      event:
        pathname === "/search"
          ? "click.deleteLink_editOn_searchResult"
          : "click.deleteLink_editOn_linkList",
    });
    if (cachedLinks.size) {
      openDeleteLink(true);
    }
  };

  const handleChangeFolder = () => {
    sendGTMEvent({
      event:
        pathname === "/search"
          ? "click.moveFolder_editOn_searchResult"
          : "click.moveFolder_editOn_linkList",
    });
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
              {currentItems.length}개 주섬
            </div>
            <ViewToolbar
              linkSort={linkSort}
              handleChangeMode={handleChangeToolbarMode}
            />
          </>
        ) : (
          <>
            <EditHeader
              totalCount={currentItems.length}
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
      ) : currentItems?.length ? (
        <div className="flex h-full flex-1 flex-col overflow-hidden">
          <div
            ref={scrollContainerRef}
            data-testid="link-list"
            role="list"
            className="flex-1 overflow-y-auto pr-2"
          >
            {currentItems.map((link, index) => (
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
            {hasNextPage && (
              <LoadMoreButton
                onClick={loadNextPage}
                remainingCount={totalItems - currentItems.length}
                variant="list"
                iconSrc="/icons/icon-down.png"
                iconAlt="더 보기"
              />
            )}
          </div>
        </div>
      ) : (
        <EmptyLinks unread={linkFilter.unread} />
      )}
    </div>
  );
}
