import { Link as LinkType } from "@/app/home/type";
import LinkComponent from "./link";
import { ChangeEvent, ReactNode, useState } from "react";
import clsx from "clsx";
import Dropdown from "@/components/dropdown";

export const sortOptions = [
  { label: "최신순", value: "created_at-asc" },
  { label: "오래된순", value: "created_at-desc" },
  { label: "제목순", value: "title" },
  { label: "많이본순", value: "" }, // TODO: api에 있는지 확인/요청
];

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
        "rounded border border-background-menu px-2 py-1 text-xs",
        isPrimary ? "bg-[#1D1D1D] text-white" : "bg-white text-black",
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

type InputProps = { linkList: LinkType[]; defaultEditMode?: boolean };

export default function LinkList({
  linkList,
  defaultEditMode = false,
}: InputProps) {
  const [editMode, setEditMode] = useState(defaultEditMode);
  const [selectedSortOption, setSelectedSortOption] = useState<Value>(
    sortOptions[0].value,
  );
  const [checkedLink, setCheckedLink] = useState<Set<string>>(new Set());
  const totalCount = linkList.length;
  const hasAllChecked = totalCount === checkedLink.size;

  const handleChangeEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleAllCheckLinks = () => {
    setCheckedLink(
      new Set(hasAllChecked ? null : linkList.map((link) => link.linkId)),
    );
  };

  const handleCheckLink = (e: ChangeEvent<HTMLInputElement>) => {
    const linkId = e.target.value;
    setCheckedLink((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(linkId)) {
        newSet.delete(linkId);
      } else {
        newSet.add(linkId);
      }
      return newSet;
    });
  };

  const handleDeleteLinks = () => {};
  const handleChangeFolder = () => {};
  return (
    <div className="flex flex-col gap-1">
      <div className="flex">
        {!editMode ? (
          <>
            <div className="text-lg font-semibold text-[#2F2F2F]">
              {totalCount}개 주섬
            </div>
            <div className="ml-auto flex gap-2">
              <Dropdown
                options={sortOptions}
                selected={selectedSortOption}
                setSelected={setSelectedSortOption}
              />
              <Button isPrimary handleClick={handleChangeEditMode}>
                편집
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-3 text-lg text-[#2F2F2F]">
              <div className="flex items-center gap-2 font-semibold">
                <input
                  type="checkbox"
                  className="relative h-[20px] w-[20px] rounded accent-primary"
                  onChange={handleAllCheckLinks}
                  checked={hasAllChecked}
                  id="allCheckbox"
                />
                <label htmlFor="allCheckbox">모두 선택</label>
              </div>
              <div>
                {checkedLink.size}/{totalCount}개
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
      <div role="list">
        {linkList.map((link, index) => (
          <div
            key={`link-${index}`}
            role="listitem"
            className="flex items-start gap-2 py-5"
          >
            <input
              type="checkbox"
              className="relative h-[20px] w-[20px] rounded accent-primary"
              onChange={handleCheckLink}
              value={link.linkId}
              checked={checkedLink.has(link.linkId)}
            />
            <LinkComponent link={link} />
          </div>
        ))}
      </div>
    </div>
  );
}
