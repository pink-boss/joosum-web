import { ChangeEvent, useState } from "react";

import Checkbox from "@/components/Checkbox";
import EmptyLinks from "@/components/EmptyLinks";
import Loading from "@/components/Loading";
import useCheckLink from "@/hooks/link/useCheckLink";
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

  const { data, isPending } = queryResult;

  const totalCount = data?.length ?? 0;

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
      ) : data?.length ? (
        <div
          data-testid="link-list"
          role="list"
          className="flex-1 overflow-y-auto"
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
