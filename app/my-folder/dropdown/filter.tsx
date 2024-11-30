"use client";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

const menu = [
  { label: "생성순", value: "created_at" },
  { label: "제목순", value: "last_saved_at" },
  { label: "업데이트순", value: "title" },
];

const DropdownFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(menu[0]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-[24px] items-center p-1 font-semibold text-text-secondary"
      >
        <div>{selectedMenu.label}</div>
        <Image src="/icons/icon-up.png" alt="up" width={24} height={24} />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 flex min-w-32 flex-col rounded-lg border border-background-secondary bg-white py-4 shadow-lg">
          {menu.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                const selectedItem = menu.find(
                  ({ value }) => value === item.value,
                );
                if (selectedItem) setSelectedMenu(selectedItem);
              }}
              className={clsx(
                "w-full px-5 py-1 text-start",
                selectedMenu.value === item.value
                  ? "font-bold text-[#1D1D1D]"
                  : "text-text-secondary",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
