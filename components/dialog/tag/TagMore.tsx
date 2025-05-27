"use client";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import useUpsertTags from "@/hooks/settings/useUpsertTags";
import { useClearDropdown } from "@/hooks/useClearDropdown";
import { useOpenSubDialogStore } from "@/store/useSubDialogStore";

export type InputProps = {
  label: string;
};

const TagMore = ({ label }: InputProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useClearDropdown(() => setIsOpen(false));
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { openDeleteTagConfirm } = useOpenSubDialogStore();

  const handleDelete = () => {
    useOpenSubDialogStore.setState({ key: label });
    openDeleteTagConfirm(true);
  };

  useEffect(() => {
    if (isOpen && dropdownRef.current) {
      dropdownRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [isOpen]);
  return (
    <div className={clsx("relative")} data-testid="tag-more" ref={ref}>
      <button
        className="rounded-full"
        onClick={() => setIsOpen((state) => !state)}
      >
        <Image
          alt="tag-more"
          src="/icons/icon-more-vertical-gray.png"
          width={24}
          height={24}
        />
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          className={clsx(
            "absolute right-0 z-10 mt-1 flex w-40 flex-col",
            "gap-[20px] rounded-lg border border-gray-ghost bg-white p-6 shadow-lg",
          )}
        >
          <TagUpdaterInput defaultValue={label} />
          <button
            className="w-full pl-1 text-start font-semibold text-gray-black"
            onClick={handleDelete}
          >
            태그 삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default TagMore;

type TagUpdaterInputProps = {
  defaultValue: string;
};

function TagUpdaterInput({ defaultValue }: TagUpdaterInputProps) {
  const { handleInput, inputRef } = useUpsertTags();
  return (
    <input
      ref={inputRef}
      className="w-full bg-gray-ghost px-2 py-[9px] text-gray-dim"
      defaultValue={defaultValue}
      onKeyUp={handleInput}
    />
  );
}

// TODO: 서버랑 연결해서 기능 마무리 짓기
