import { LinkFilterState } from "@/store/useLinkFilterStore";
import { removeItem } from "@/utils/array";
import clsx from "clsx";

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
          className="flex items-center gap-1 rounded-[50px] bg-background-menu px-2 py-1"
        >
          <span>{tag}</span>
          <button
            className={clsx(
              "flex h-4 w-4 items-center justify-center",
              "rounded-full bg-[#BBBBBB] text-sm font-medium text-white",
            )}
            onClick={() => handleRemoveTag(tag)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  ) : (
    <span className="text-sm text-[#BBBBBB]" data-testid="selected-tags-empty">
      태그를 선택해주세요.
    </span>
  );
}

type InputProps = Pick<LinkFilterState, "tags" | "setTags">;

export default function SelectedTags({ tags, setTags }: InputProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-[#1D1D1D]` font-bold">선택된 태그</span>
        <span className="text-xs text-[#BBBBBB]">{tags.length}/10</span>
      </div>
      <TagBadge tags={tags} setTags={setTags} />
    </>
  );
}
