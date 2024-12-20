"use client";

import { useClearDropdown } from "@/hooks/useClearDropdown";
import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { LinkFilterState } from "@/store/useLinkFilterStore";
import { SelectBox } from "./SelectBox";
import Checkbox from "@/components/Checkbox";
import SelectedTags from "./SelectedTags";
import { removeItem } from "@/utils/array";
import ResetButton from "../ResetButton";
import { useQuery } from "@tanstack/react-query";

export type InputProps = Pick<LinkFilterState, "tags" | "setTags"> & {
  className?: string;
  selectBoxClassName?: string;
};

const TagSelector = ({
  className,
  selectBoxClassName,
  tags,
  setTags,
}: InputProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useClearDropdown(() => setIsOpen(false));

  const {
    isPending,
    error,
    data: totalTags = [],
  } = useQuery<string[]>({
    queryKey: ["tags"],
    queryFn: () =>
      fetch(`/api/tags`, {
        method: "GET",
      }).then((res) => res.json()),
    staleTime: 60 * 60 * 1000,
  });

  const handleCheckTag = (e: ChangeEvent<HTMLInputElement>) => {
    const targetTag = e.target.value;
    if (tags.length && tags.includes(targetTag)) {
      setTags(removeItem(tags, targetTag));
    } else {
      setTags([...tags, targetTag]);
    }
  };

  const handleResetTags = () => {
    setTags([]);
  };
  return (
    <div
      className={clsx("relative", className && className)}
      data-testid="tag-selector"
      ref={ref}
    >
      <SelectBox
        className={selectBoxClassName}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selected={tags}
      />

      {isOpen && (
        <div
          className={clsx(
            "absolute z-10 mt-1 flex max-w-min flex-col",
            "border-gray-ghost gap-[20px] rounded-lg border bg-white p-6 shadow-lg",
          )}
        >
          <div className="flex flex-col gap-[20px]">
            <SelectedTags tags={tags} setTags={setTags} />
            <div className="mini-scroll border-gray-ghost flex h-[222px] w-[258px] flex-col gap-[10px] overflow-auto border p-3">
              {totalTags.map((tag) => (
                <div key={`total-tag-${tag}`} className="flex gap-2">
                  <Checkbox
                    id={`tag-${tag}`}
                    checked={tags.includes(tag)}
                    value={tag}
                    onChange={handleCheckTag}
                  />
                  <label htmlFor={`tag-${tag}`} className="text-sm">
                    {tag}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <ResetButton handleClick={handleResetTags} />
            <button className="bg-primary-500 h-[40px] flex-1 rounded-lg text-sm font-bold text-white">
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSelector;
