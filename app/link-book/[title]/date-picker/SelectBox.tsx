import { DateRange } from "@/types/date.types";
import { dateFormatter } from "@/utils/date";
import clsx from "clsx";
import Image from "next/image";

type SelectBoxProps = {
  selected: DateRange;
  isOpen: boolean | undefined;
  setIsOpen: (isOpen: boolean) => void;
};

export function SelectBox({ selected, isOpen, setIsOpen }: SelectBoxProps) {
  return (
    <button
      data-testid="open-button"
      onClick={() => setIsOpen(!isOpen)}
      className={clsx(
        "flex items-center px-3 text-sm text-text-secondary",
        "h-[46px] w-[305px] rounded-lg border border-[#BBBBBB]",
      )}
    >
      {selected.length ? (
        <span>
          {selected[0] && dateFormatter(selected[0], "numeric")}
          {selected[1] && ` ~ ${dateFormatter(selected[1], "numeric")}`}
        </span>
      ) : undefined}

      <Image
        src="/icons/icon-down3.png"
        alt="down"
        width={20}
        height={20}
        className="ml-auto"
      />
    </button>
  );
}
