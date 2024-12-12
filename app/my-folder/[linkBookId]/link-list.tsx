import LinkComponent from "./link";
import { ChangeEvent, ReactNode, useState } from "react";
import clsx from "clsx";
import Dropdown from "@/components/dropdown";
import Checkbox from "@/components/checkbox";
import Loading from "@/components/loading";
import { Field, useLinkSortStore } from "@/store/useLinkSortStore";
import { useLinkFilterStore } from "@/store/useLinkFilterStore";
import EmptyLinks from "@/components/EmptyLinks";
import { useQueryLinks } from "@/hooks/query-links";

export const sortOptions: OptionItem<Field>[] = [
  { label: "최신순", value: "lastest" },
  { label: "오래된순", value: "oldest" },
  { label: "제목순", value: "title" },
  { label: "많이본순", value: "mostViewd" },
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

type InputProps = { defaultEditMode?: boolean };

export default function LinkList({ defaultEditMode = false }: InputProps) {
  const linkSort = useLinkSortStore();
  const { unread } = useLinkFilterStore();

  const [editMode, setEditMode] = useState(defaultEditMode);
  const [checkedLink, setCheckedLink] = useState<Set<string>>(new Set());
  const { data, isPending } = useQueryLinks();
  const totalCount = data.length;
  const hasAllChecked = totalCount === checkedLink.size;

  const handleChangeEditMode = () => {
    setEditMode((prev) => !prev);
  };

  const handleAllCheckLinks = () => {
    setCheckedLink(
      new Set(hasAllChecked ? null : data.map((link) => link.linkId)),
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
    <div className="flex flex-1 flex-col gap-1 overflow-hidden">
      <div className="flex items-center">
        {!editMode ? (
          <>
            <div className="text-lg font-semibold text-[#2F2F2F]">
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
            <div className="flex items-center gap-3 text-lg text-[#2F2F2F]">
              <div className="flex items-center gap-2 font-semibold">
                <Checkbox
                  className="relative"
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
      {isPending ? (
        <Loading />
      ) : data.length ? (
        <div role="list">
          {data.map((link, index) => (
            <div
              key={`link-${index}`}
              role="listitem"
              className="flex items-start gap-2 py-5"
            >
              {editMode && (
                <Checkbox
                  className="relative"
                  onChange={handleCheckLink}
                  value={link.linkId}
                  checked={checkedLink.has(link.linkId)}
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
