import { useSearchBarStore } from "@/store/useSearchBarStore";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";

type InputProps = {
  _defaulValue?: string;
};

export default function SearchInput({ _defaulValue = "" }: InputProps) {
  const router = useRouter();
  const { setTitle } = useSearchBarStore();
  const [value, setValue] = useState(_defaulValue);
  const handleSubmit = () => {
    setTitle(value);
    router.push("search");
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="relative w-fit">
      <input
        type="text"
        placeholder="링크 제목으로 검색해보세요."
        className={clsx(
          "h-[48px] min-w-[360px] max-w-[720px] rounded-lg border pl-3 pr-20",
          "focus:bg-inputactivebg",
        )}
        onKeyDown={handleKeyDown}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div
        className={clsx(
          "absolute right-3 top-1/2 -translate-y-1/2",
          "flex cursor-pointer items-center justify-center gap-2 p-2",
        )}
        onClick={handleSubmit}
      >
        {value && (
          <button
            type="button"
            // onClick={() => removeTag(index)}
            className={clsx(
              "size-5 rounded-full bg-gray-silver",
              "flex items-center justify-center pb-0.5 text-white",
            )}
          >
            &times;
          </button>
        )}
        <Image
          src="/icons/icon-search.png"
          alt="search"
          width={22}
          height={22}
        />
      </div>
    </div>
  );
}
