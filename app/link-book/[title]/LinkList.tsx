import clsx from "clsx";
import { ChangeEvent, ReactNode, useState } from "react";

import Checkbox from "@/components/Checkbox";
import Dropdown from "@/components/Dropdown";
import EmptyLinks from "@/components/EmptyLinks";
import Loading from "@/components/Loading";
import useCheckLink from "@/hooks/link/useCheckLink";
import { useQueryLinks } from "@/hooks/link/useQueryLinks";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { useLinkFilterStore } from "@/store/useLinkFilterStore";
import { useLinkSortStore } from "@/store/useLinkSortStore";

import { sortOptions } from "../constants";
import LinkComponent from "./LinkCard";

type ButtonInputProps = {
  children: ReactNode;
  isPrimary?: boolean;
  handleClick: () => void;
};

function Button({
  children,
  isPrimary = false,
  handleClick,
}: ButtonInputProps) {
  return (
    <button
      className={clsx(
        "rounded border border-gray-vapor px-9 py-1.5 text-xs",
        isPrimary ? "bg-gray-black text-white" : "bg-white text-black",
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

type InputProps = { defaultEditMode?: boolean };

export default function LinkList({ defaultEditMode = false }: InputProps) {
  const linkSort = useLinkSortStore();
  const { unread } = useLinkFilterStore();

  const { openDeleteLink, openReassignLinkBook } = useOpenDialogStore();
  const [editMode, setEditMode] = useState(defaultEditMode);
  const { cachedLinks, setCachedLink, setAllLinks } = useCheckLink();
  const { data, isPending } = useQueryLinks();
  const totalCount = data.length;
  const hasAllChecked = totalCount === cachedLinks.size;

  const handleChangeEditMode = () => {
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
            <div className="ml-auto flex items-center gap-2">
              <Dropdown
                options={sortOptions}
                selected={linkSort.field}
                setSelected={linkSort.setField}
              />
              <Button isPrimary handleClick={handleChangeEditMode}>
                편집
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 text-lg text-gray-ink">
              <div className="flex items-center gap-2 font-semibold">
                <Checkbox
                  onChange={handleAllCheckLinks}
                  checked={hasAllChecked}
                  id="allCheckbox"
                />
                <label htmlFor="allCheckbox">모두 선택</label>
              </div>
              <div>
                {cachedLinks.size}/{totalCount}개
              </div>
            </div>
            <div className="ml-auto flex gap-2">
              <Button handleClick={handleDeleteLinks}>삭제</Button>
              <Button handleClick={handleChangeFolder}>폴더이동</Button>
              <Button isPrimary handleClick={handleChangeEditMode}>
                편집종료
              </Button>
            </div>
          </>
        )}
      </div>
      {isPending ? (
        <Loading />
      ) : data.length ? (
        <div role="list" className="flex-1 overflow-auto">
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
