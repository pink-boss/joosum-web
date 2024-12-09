import { isAfter, isBefore, isBetween, isSameDate } from "@/utils/date";
import { RenderDateType } from "./type";
import clsx from "clsx";
import { useLinkFilterStore } from "@/store/useLinkFilterStore";

type InputProps = RenderDateType & {};

const RenderDate = ({ month, date, monthType, dateObj }: InputProps) => {
  const { dateRange, setDateRange } = useLinkFilterStore();
  const today = new Date(new Date().toDateString());
  const startDate = dateRange[0] ? new Date(dateRange[0]) : undefined;
  const endDate = dateRange[1] ? new Date(dateRange[1]) : undefined;

  const greaterThanToday = isAfter(dateObj, today);
  const lessThanStartDate =
    startDate && !endDate && isBefore(dateObj, startDate);
  const disabled = greaterThanToday || lessThanStartDate;

  const isSelectedDate = dateRange.some((_dateRange) =>
    isSameDate(new Date(_dateRange), dateObj),
  );

  const isDateInRange =
    startDate && endDate && isBetween(dateObj, startDate, endDate, true);

  const handleClickDate = (date: Date) => {
    if (dateRange.length == 1) {
      setDateRange([...dateRange, date]);
    } else {
      setDateRange([date]);
    }
  };

  return (
    <div key={`${month}-${date}`} className="relative" role="listitem">
      {isDateInRange && (
        <div
          className={clsx(
            "absolute inset-0 left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2",
            "h-full w-[38.5px] bg-[#DFD9FF]",
            isSameDate(startDate, dateObj) && "w-[19.25px] translate-x-0",
            isSameDate(endDate, dateObj) && "left-0 w-[19.25px]",
            isSameDate(startDate, endDate) && "w-0",
          )}
        ></div>
      )}
      {isSelectedDate && (
        <div
          className={clsx(
            "absolute inset-0 left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2",
            "h-[30px] w-[30px] rounded-full bg-[#5242BF]",
          )}
        ></div>
      )}
      <button
        className={clsx(
          "relative h-[30px] w-[30px] text-sm font-semibold",
          monthType === "this" ? "text-[#2F2F2F]" : "text-[#BBBBBB]",
          greaterThanToday && "text-[#BBBBBB]",
          isSelectedDate && "text-white",
        )}
        onClick={() => handleClickDate(dateObj)}
        disabled={disabled}
      >
        {date}
      </button>
    </div>
  );
};

export default RenderDate;
