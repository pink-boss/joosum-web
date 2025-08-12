"use client";
import { sendGTMEvent } from "@next/third-parties/google";
import clsx from "clsx";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { useClearDropdown } from "@/hooks/useClearDropdown";

type InputProps = {
  selected: Value;
  setSelected: (option: Value) => void;
  options: OptionItem[];
};

const Dropdown = ({ selected, setSelected, options }: InputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useClearDropdown(() => setIsOpen(false));

  const selectedOption = options.find(({ value }) => selected === value);

  const pathname = usePathname();
  const onClick = () => {
    sendGTMEvent({
      event:
        pathname === "/my-folder"
          ? "click.sortby_myFolder"
          : pathname === "/search"
            ? "click.sortby_searchResult"
            : "click.sortby_linkList",
    });
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative h-fit" data-testid="sort-dropdown" ref={ref}>
      <button
        data-testid="open-button"
        onClick={onClick}
        className="flex h-[24px] items-center p-1 font-semibold text-gray-dim"
      >
        <div>{selectedOption?.label}</div>
        <Image src="/icons/icon-down2.png" alt="down" width={24} height={24} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-1 flex min-w-32 flex-col rounded-lg border border-gray-ghost bg-white py-4 shadow-xl"
          data-testid="dropdown-content"
        >
          {options.map((item) => (
            <button
              data-testid={`dropdown-${item.label}`}
              key={item.value}
              onClick={() => {
                setSelected(item.value);
                setIsOpen(false);
              }}
              className={clsx(
                "w-full px-5 py-1 text-left leading-5",
                selected === item.value
                  ? "font-bold text-gray-black"
                  : "text-gray-dim",
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

export default Dropdown;
