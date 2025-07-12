import { ChangeEvent, useMemo, useState } from "react";

import Checkbox from "@/components/Checkbox";
import EmptyLinks from "@/components/EmptyLinks";
import Loading from "@/components/Loading";
import useCheckLink from "@/hooks/link/useCheckLink";
import {
  useQueryLinks,
  useQueryLinkBookLinks,
  useQuerySearchLinks,
} from "@/hooks/link/useQueryLinks";
import { LinkFilterValues } from "@/store/link-filter/schema";
import { LinkSortState } from "@/store/link-sort/schema";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { LinkBook } from "@/types/linkBook.types";

import EditHeader from "./EditHeader";
import EditToolbar from "./EditToolbar";
import LinkComponent from "./LinkCard";
import ViewToolbar from "./ViewToolbar";

type LinkListType = "linkBook" | "search";

type BaseInputProps = {
  defaultEditMode?: boolean;
  linkSort: LinkSortState;
  linkFilter: LinkFilterValues;
};

type LinkBookProps = BaseInputProps & {
  type: "linkBook";
  linkBookId?: LinkBook["linkBookId"];
};

type SearchProps = BaseInputProps & {
  type: "search";
  linkBookId?: LinkBook["linkBookId"];
};

type InputProps = LinkBookProps | SearchProps;

export default function LinkList(props: InputProps) {
  const { defaultEditMode = false, linkSort, linkFilter, type } = props;
  const linkBookId = "linkBookId" in props ? props.linkBookId : undefined;

  const { openDeleteLink, openReassignLinkBook } = useOpenDialogStore();
  const [editMode, setEditMode] = useState(defaultEditMode);
  const { cachedLinks, setCachedLink, setAllLinks } = useCheckLink();

  // 타입에 따라 적절한 훅 사용
  const linkBookLinks = useQueryLinkBookLinks({
    linkSort,
    linkFilter,
    linkBookId,
  });
  const searchLinks = useQuerySearchLinks({
    linkSort,
    linkFilter,
    linkBookId,
  });
  const { data, isPending } = type === "linkBook" ? linkBookLinks : searchLinks;

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
