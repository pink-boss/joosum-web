"use client";

import clsx from "clsx";
import { ChangeEvent, useState } from "react";

import Checkbox from "@/components/Checkbox";
import { useClearDropdown } from "@/hooks/useClearDropdown";
import useQueryLinkFilterTags from "@/hooks/useQueryLinkFilterTags";
import { FolderLinkFilterState } from "@/store/link-filter/useFolderStore";
import { removeItem } from "@/utils/array";

import { SelectBox } from "./SelectBox";
import SelectedTags from "./SelectedTags";
import ResetButton from "../ResetButton";

export type InputProps = Pick<FolderLinkFilterState, "tags" | "setTags"> & {
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

  const { totalTags } = useQueryLinkFilterTags();

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
            "gap-[20px] rounded-lg border border-gray-ghost bg-white p-6 shadow-lg",
          )}
        >
          <div className="flex flex-col gap-[20px]">
            <SelectedTags tags={tags} setTags={setTags} />
            <div
              role="list"
              className="mini-scroll flex h-[222px] w-[258px] flex-col gap-[10px] overflow-auto border border-gray-ghost p-3"
            >
              {totalTags.map((tag, index) => (
                <div key={`total-tag-${index}`} className="flex gap-2">
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
          <div className="flex justify-end gap-4">
            <ResetButton handleClick={handleResetTags} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSelector;
