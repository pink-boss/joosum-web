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
          className="bg-gray-vapor flex items-center gap-1 rounded-[50px] px-2 py-1"
        >
          <span>{tag}</span>
          <button
            className={clsx(
              "flex h-4 w-4 items-center justify-center",
              "bg-gray-silver rounded-full text-sm font-medium text-white",
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
      className="text-gray-silver p-2 text-sm"
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
        <span className="text-gray-black` font-bold">선택된 태그</span>
        <span className="text-gray-silver text-xs">{tags.length}/10</span>
      </div>
      <TagBadge tags={tags} setTags={setTags} />
    </>
  );
}
