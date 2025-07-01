import clsx from "clsx";
import Image from "next/image";

import { DateRange } from "@/types/date.types";
import { dateFormatter } from "@/utils/date";

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
        "flex items-center px-3 text-sm text-gray-dim",
        "h-[46px] w-[305px] rounded-lg border border-gray-silver",
      )}
    >
      {selected.length ? (
        <span>
          {selected[0] && dateFormatter(selected[0], "numeric")}
          {selected[1] && ` ~ ${dateFormatter(selected[1], "numeric")}`}
        </span>
      ) : (
        <span>전체</span>
      )}

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
