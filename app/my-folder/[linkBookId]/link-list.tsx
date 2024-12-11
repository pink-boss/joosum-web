import LinkComponent from "./link";
import { ChangeEvent, ReactNode, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import Dropdown from "@/components/dropdown";
import Checkbox from "@/components/checkbox";
import { useParams } from "next/navigation";
import { LinkBookIdParam } from "../type";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/loading";
import { Field, useLinkSortStore } from "@/store/useLinkSortStore";
import { useLinkFilterStore } from "@/store/useLinkFilterStore";
import { isBetween } from "@/utils/date";

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
  const { linkBookId } = useParams<LinkBookIdParam>();
  const linkSort = useLinkSortStore();
  const { unread, dateRange, tags } = useLinkFilterStore();

  const {
    isPending,
    error,
    data = [],
    refetch,
  } = useQuery<Link[], ApiError>({
    queryKey: ["links", linkBookId],
    queryFn: () =>
      fetch(
        `/api/links/${linkBookId}?sort=${linkSort.sort}&order=${linkSort.orderBy}`,
        {
          method: "GET",
        },
      )
        .then((res) => res.json())
        .then((data: Link[]) => {
          if (linkSort.field === "mostViewd") {
            return [...data].sort(
              (prev, next) => next.readCount - prev.readCount,
            );
          }
          return data;
        }),
  });

  const linkList = useMemo(() => {
    return data.filter(({ readCount, createdAt, tags: linkTags }) => {
      const unreadFlag = unread ? !readCount : true;
      const datePickerFlag = dateRange.length
        ? dateRange.length == 2 &&
          isBetween(
            new Date(createdAt),
            new Date(dateRange[0]),
            new Date(dateRange[1]),
            true,
          )
        : true;
      const tagFlag = tags.length
        ? tags.some((tag) => linkTags.includes(tag))
        : true;
      return unreadFlag && datePickerFlag && tagFlag;
    });
  }, [data, dateRange, unread, tags]);

  useEffect(() => {
    if (linkSort.field) {
      refetch();
    }
  }, [refetch, linkSort.field]);

  const [editMode, setEditMode] = useState(defaultEditMode);
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
      ) : (
        <div role="list">
          {linkList.map((link, index) => (
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
      )}
    </div>
  );
}
