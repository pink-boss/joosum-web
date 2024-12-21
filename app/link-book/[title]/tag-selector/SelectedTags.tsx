import clsx from "clsx";

import { LinkFilterState } from "@/store/useLinkFilterStore";
import { removeItem } from "@/utils/array";

type BadgeInputProps = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

export function TagBadge({ tags, setTags }: BadgeInputProps) {
  const handleRemoveTag = (targetTag: string) => {
    setTags(removeItem(tags, targetTag));
  };
  return tags.length ? (
    <div className="flex flex-wrap gap-2" data-testid="selected-tags">
      {tags.map((tag) => (
        <div
          key={`selected-tag-${tag}`}
          className="flex items-center gap-1 rounded-[50px] bg-gray-vapor px-2 py-1"
        >
          <span>{tag}</span>
          <button
            className={clsx(
              "flex size-4 items-center justify-center",
              "rounded-full bg-gray-silver text-sm font-medium text-white",
            )}
            onClick={() => handleRemoveTag(tag)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  ) : (
    <div
      className="p-2 text-sm text-gray-silver"
      data-testid="selected-tags-empty"
    >
      태그를 선택 또는 생성 해주세요.
    </div>
  );
}

type InputProps = Pick<LinkFilterState, "tags" | "setTags">;

export default function SelectedTags({ tags, setTags }: InputProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-black">선택된 태그</span>
        <span className="text-xs text-gray-silver">{tags.length}/10</span>
      </div>
      <TagBadge tags={tags} setTags={setTags} />
    </>
  );
}
