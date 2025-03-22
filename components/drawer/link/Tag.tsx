import TagSelector from "@/app/link-book/[title]/tag-selector";
import { TagBadge } from "@/app/link-book/[title]/tag-selector/SelectedTags";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

type InputProps = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

export default function Tag({ tags, setTags }: InputProps) {
  const [isEditTag, setIsEditTag] = useState<boolean>(true);

  return (
    <div className="flex flex-col gap-2 text-gray-black">
      <div className="flex justify-between px-2">
        <label htmlFor="title" className="text-lg font-semibold">
          태그
        </label>
        <span className="text-sm">{tags.length}/10</span>
      </div>
      <div className="flex flex-wrap items-center gap-2 rounded border border-gray-300 p-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center rounded-full bg-gray-200 px-2 py-1 text-sm"
          >
            <span>{tag}</span>
            <button
              type="button"
              // onClick={() => removeTag(index)}
              className="ml-1 text-gray-500 hover:text-red-500"
            >
              &times;
            </button>
          </div>
        ))}
        <input
          className="min-w-[120px] flex-1 p-1 outline-none"
          type="text"
          // value={input}
          // onChange={(e) => setInput(e.target.value)}
          // onKeyDown={handleKeyDown}
          placeholder="태그 입력..."
        />
      </div>
      {/* <input
        className={clsx(
          "h-[48px] w-full p-3",
          "rounded-lg border border-gray-ghost bg-gray-ghost",
        )}
        placeholder="태그를 추가해보세요."
        value={tags}

      /> */}
    </div>
  );
}
