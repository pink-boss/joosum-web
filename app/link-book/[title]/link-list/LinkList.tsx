import { ChangeEvent, useState } from "react";

import Checkbox from "@/components/Checkbox";
import EmptyLinks from "@/components/EmptyLinks";
import Loading from "@/components/Loading";
import useCheckLink from "@/hooks/link/useCheckLink";
import { useQueryLinks } from "@/hooks/link/useQueryLinks";
import { useOpenDialogStore } from "@/store/useDialogStore";

import LinkComponent from "./LinkCard";
import { LinkSortState } from "@/store/link-sort/schema";
import { LinkFilterState } from "@/store/link-filter/schema";
import ViewToolbar from "./ViewToolbar";
import EditToolbar from "./EditToolbar";
import EditHeader from "./EditHeader";

type InputProps = Pick<LinkFilterState, "unread"> & {
  defaultEditMode?: boolean;
  linkSort: LinkSortState;
};

export default function LinkList({
  defaultEditMode = false,
  linkSort,
  unread,
}: InputProps) {
  const { openDeleteLink, openReassignLinkBook } = useOpenDialogStore();
  const [editMode, setEditMode] = useState(defaultEditMode);
  const { cachedLinks, setCachedLink, setAllLinks } = useCheckLink();
  const { data, isPending } = useQueryLinks();
  const totalCount = data.length;

  const handleChangeToolbarMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleAllCheckLinks = (e: ChangeEvent<HTMLInputElement>) => {
    setAllLinks(!!e.target.checked);
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
              <LinkComponent link={link} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyLinks unread={unread} />
      )}
    </div>
  );
}
