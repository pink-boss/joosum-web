import Image from "next/image";
import { useRouter } from "next/navigation";
import { KeyboardEvent, useState } from "react";

import { useSearchBarStore } from "@/store/useSearchBarStore";

export default function Topbar() {
  const router = useRouter();
  const { setTitle } = useSearchBarStore();
  const [value, setValue] = useState("");
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
    <div className="mb-8 flex h-[104px] w-full items-center justify-between border bg-paperabovebg px-10 py-7">
      <div className="relative">
        <input
          type="text"
          placeholder="제목으로 검색해보세요."
          className="h-[48px] min-w-[480px] max-w-[720px] rounded-lg border pl-3"
          onKeyDown={handleKeyDown}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-2"
          onClick={handleSubmit}
        >
          <Image
            src="/icons/icon-search.png"
            alt="search"
            width={24}
            height={24}
          />
        </div>
      </div>
      <div className="flex gap-[20px]">
        <button className="h-[48px] w-[200px] rounded-xl bg-black text-xl font-bold text-white">
          링크 저장
        </button>
        <Image
          src="/icons/user.png"
          alt="user"
          width={48}
          height={48}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}
