import { isAfter, isBefore, isBetween, isSameDate } from "@/utils/date";
import clsx from "clsx";
import { useLinkFilterStore } from "@/store/useLinkFilterStore";
import { RenderDateType } from "@/types/date.types";

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
  const { dateRange, setDateRange } = useLinkFilterStore();
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
            "h-full bg-[#DFD9FF]",
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
            "h-[30px] w-[30px] rounded-full bg-[#5242BF]",
          )}
        />
      )}
      <button
        className={clsx(
          "relative h-[30px] w-[30px] text-sm font-semibold",
          monthType === "this" ? "text-[#2F2F2F]" : "text-[#BBBBBB]",
          greaterThanToday && "text-[#BBBBBB]",
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
