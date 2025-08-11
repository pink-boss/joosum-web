import clsx from "clsx";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";

import { useSearchLinkFilterStore } from "@/store/link-filter/useSearchStore";
import { useSearchLinkSortStore } from "@/store/link-sort/useSearchStore";
import { useSearchBarStore } from "@/store/useSearchBarStore";

type InputProps = {
  inputDelay?: number;
};

export default function SearchInput({ inputDelay = 1000 }: InputProps) {
  const router = useRouter();
  const { title, setTitle } = useSearchBarStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [inputValue, setInputValue] = useState(title);
  const { setField } = useSearchLinkSortStore();
  const { resetLinkBookId } = useSearchLinkFilterStore();

  const handleChangeSearchState = useCallback(
    (value: string) => {
      setTitle(value);
      router.push("/search");
      setField("relevance");
    },
    [setTitle, setField, router],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.code === "Enter") {
        handleChangeSearchState(e.currentTarget.value);
      }
    },
    [handleChangeSearchState],
  );

  useEffect(() => {
    if (inputValue.length === 0) return;
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      handleChangeSearchState(inputValue);
    }, inputDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [inputValue, inputDelay, handleChangeSearchState]);

  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/search") {
      setInputValue("");
      setTitle("");
      resetLinkBookId();
    }
  }, [pathname, resetLinkBookId, setInputValue, setTitle]);

  return (
    <div
      className={clsx(
        "relative inline-block w-full",
        "max-w-[360px] lg:max-w-[540px] pc:max-w-[720px]",
      )}
      data-testid="search-link"
    >
      <input
        data-testid="search-link-input"
        type="text"
        placeholder="링크 제목으로 검색해보세요."
        className={clsx(
          "h-[48px] w-full rounded-lg border pl-3 pr-20",
          "focus:bg-primary-100",
        )}
        onKeyDown={handleKeyDown}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div
        className={clsx(
          "absolute right-3 top-1/2 -translate-y-1/2",
          "flex items-center justify-center gap-2 p-2",
        )}
      >
        {inputValue && (
          <button
            data-testid="clear-button"
            type="button"
            onClick={() => setInputValue("")}
            className={clsx(
              "size-5 rounded-full",
              "bg-gray-silver text-lg text-white",
              "flex items-center justify-center",
            )}
          >
            &times;
          </button>
        )}
        <button
          data-testid="search-button"
          type="button"
          className="cursor-pointer"
          onClick={() => handleChangeSearchState(inputValue)}
        >
          <Image
            src="/icons/icon-search.png"
            alt="search"
            width={22}
            height={22}
          />
        </button>
      </div>
    </div>
  );
}
