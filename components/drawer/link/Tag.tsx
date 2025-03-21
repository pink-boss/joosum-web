import TagSelector from "@/app/link-book/[title]/tag-selector";
import { TagBadge } from "@/app/link-book/[title]/tag-selector/SelectedTags";
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
        <button
          className="flex font-semibold text-primary-500"
          data-testid="edit-tags-button"
          onClick={() => {
            // setIsEditTag((prev) => !prev)
          }}
        >
          {isEditTag ? (
            "추가 종료"
          ) : (
            <>
              <Image
                src="/icons/icon-plus.png"
                alt="new tag"
                width={24}
                height={24}
              />
              태그추가
            </>
          )}
        </button>
      </div>
      {isEditTag ? (
        <TagSelector
          tags={tags}
          setTags={setTags}
          selectBoxClassName="border-none bg-gray-ghost"
        />
      ) : (
        <TagBadge tags={tags} setTags={setTags} />
      )}
    </div>
  );
}
