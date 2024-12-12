"use client";
import { useClearDropdown } from "@/hooks/clear-dropdown";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";

type InputProps = {
  selected: Value;
  setSelected: (option: Value) => void;
  options: OptionItem[];
};

const Dropdown = ({ selected, setSelected, options }: InputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useClearDropdown(() => setIsOpen(false));

  const selectedOption = options.find(({ value }) => selected === value);
  return (
    <div className="relative h-fit" data-testid="sort-dropdown" ref={ref}>
      <button
        data-testid="open-button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-[24px] items-center p-1 font-semibold text-text-secondary"
      >
        <div>{selectedOption?.label}</div>
        <Image src="/icons/icon-down2.png" alt="down" width={24} height={24} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-1 flex min-w-32 flex-col rounded-lg border border-background-secondary bg-white py-4 shadow-lg"
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
                "w-full px-5 py-1 leading-5",
                selected === item.value
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

export default Dropdown;
