"use client";
import { useClearDropdown } from "@/hooks/clear-dropdown";
import clsx from "clsx";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useLinkFilterStore } from "@/store/useLinkFilterStore";
import { SelectBox } from "./select-box";
import Checkbox from "@/components/checkbox";
import SelectedTags from "./selected-tags";
import { removeItem } from "@/utils/array";

export type InputProps = {
  open?: boolean;
  totalTags: string[];
};

// TODO: 태그는 서버에서 받아오기
const TagSelector = ({ open, totalTags }: InputProps) => {
  const ref = useClearDropdown(() => setIsOpen(false));
  const [isOpen, setIsOpen] = useState(open);
  const { tags, setTags } = useLinkFilterStore();

  const handleCheckTag = (e: ChangeEvent<HTMLInputElement>) => {
    const targetTag = e.target.value;
    if (tags.length && tags.includes(targetTag)) {
      setTags(removeItem(tags, targetTag));
    } else {
      setTags([...tags, targetTag]);
    }
  };

  const handleResetDateRange = () => {
    setTags([]);
  };
  return (
    <div className="relative" data-testid="date-picker" ref={ref}>
      <SelectBox isOpen={isOpen} setIsOpen={setIsOpen} selected={tags} />

      {isOpen && (
        <div
          className={clsx(
            "absolute z-10 mt-1 flex max-w-min flex-col",
            "gap-[20px] rounded-lg border border-background-secondary bg-white p-6 shadow-lg",
          )}
        >
          <div className="flex flex-col gap-[20px]">
            <SelectedTags />
            <div className="mini-scroll flex h-[222px] w-[258px] flex-col gap-[10px] overflow-auto border border-background-secondary p-3">
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
            <button
              className="flex w-16 items-center gap-1 text-sm font-semibold text-text-secondary"
              onClick={handleResetDateRange}
            >
              <Image
                src="/icons/reset.png"
                alt="reset"
                width={16}
                height={16}
              />
              초기화
            </button>
            <button className="h-[40px] flex-1 rounded-lg bg-primary text-sm font-bold text-white">
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TagSelector;
