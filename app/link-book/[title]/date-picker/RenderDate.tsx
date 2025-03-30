import clsx from "clsx";

import { useFolderLinkFilterStore } from "@/store/link-filter/useFolderStore";
import { RenderDateType } from "@/types/date.types";
import { isAfter, isBefore, isBetween, isSameDate } from "@/utils/date";

type InputProps = RenderDateType & {
  tmpSelectedDate: Date | null;
  setTmpSelectedDate: (tmpSelectedDate: Date | null) => void;
};

const RenderDate = ({
  month,
  date,
  monthType,
  dateObj,
  tmpSelectedDate,
  setTmpSelectedDate,
}: InputProps) => {
  const { dateRange, setDateRange } = useFolderLinkFilterStore();
  const today = new Date(new Date().toDateString());
  const startDate = dateRange[0] ? new Date(dateRange[0]) : undefined;
  const endDate = dateRange[1] ? new Date(dateRange[1]) : undefined;

  const greaterThanToday = isAfter(dateObj, today);
  const lessThanSelectedDate =
    !!tmpSelectedDate && isBefore(dateObj, tmpSelectedDate);
  const disabled = greaterThanToday || lessThanSelectedDate;

  const isSelectedDate = tmpSelectedDate
    ? isSameDate(tmpSelectedDate, dateObj)
    : dateRange.some((_dateRange) => isSameDate(new Date(_dateRange), dateObj));

  const isDateInRange =
    startDate && endDate && isBetween(dateObj, startDate, endDate, true);

  const handleClickDate = () => {
    if (tmpSelectedDate) {
      setTmpSelectedDate(null);
      setDateRange([tmpSelectedDate, dateObj]);
    } else {
      setTmpSelectedDate(dateObj);
    }
  };

  return (
    <div key={`${month}-${date}`} className="relative" role="listitem">
      {!tmpSelectedDate && isDateInRange && (
        <div
          className={clsx(
            "absolute inset-0 left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2",
            "h-full bg-primary-lavender",
            isSelectedDate ? "w-[19.25px]" : "w-[38.5px]",
            isSameDate(startDate, dateObj) && "translate-x-0",
            isSameDate(endDate, dateObj) && "-translate-x-full",
            isSameDate(startDate, endDate) && "hidden",
          )}
        />
      )}
      {isSelectedDate && (
        <div
          className={clsx(
            "absolute inset-0 left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2",
            "size-[30px] rounded-full bg-paperabovebg",
          )}
        />
      )}
      <button
        className={clsx(
          "relative size-[30px] text-sm font-semibold",
          monthType === "this" ? "text-gray-ink" : "text-gray-silver",
          greaterThanToday && "text-gray-silver",
          isSelectedDate && "text-white",
        )}
        onClick={handleClickDate}
        disabled={disabled}
      >
        {date}
      </button>
    </div>
  );
};

export default RenderDate;
