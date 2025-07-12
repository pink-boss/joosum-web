"use client";
import clsx from "clsx";
import { useState } from "react";

import { useClearDropdown } from "@/hooks/useClearDropdown";
import { DateRange } from "@/types/date.types";
import { getCalendarDate } from "@/utils/date";

import ChangeMonth from "./ChangeMonth";
import LastPeriodButton from "./LastPeriodButton";
import RenderDate from "./RenderDate";
import { SelectBox } from "./SelectBox";
import ResetButton from "../ResetButton";
import RenderWeek from "./RenderWeek";

export type InputProps = {
  open?: boolean;
  dateRange?: DateRange;
  setDateRange: (dateRange: DateRange) => void;
};

const DatePicker = ({ open, dateRange = [], setDateRange }: InputProps) => {
  const ref = useClearDropdown(() => setIsOpen(false));
  const [isOpen, setIsOpen] = useState(open);
  const [tmpSelectedDate, setTmpSelectedDate] = useState<Date | null>(null);
  const today = new Date(new Date().toDateString());
  const [renderMonth, setRenderMonth] = useState(today);

  const handleResetDateRange = () => {
    setTmpSelectedDate(null);
    setDateRange([]);
  };
  return (
    <div className="relative w-[305px]" data-testid="date-picker" ref={ref}>
      <SelectBox isOpen={isOpen} setIsOpen={setIsOpen} selected={dateRange} />

      {isOpen && (
        <div
          className={clsx(
            "absolute z-10 mt-1 flex max-w-min flex-col",
            "gap-[20px] rounded-lg border border-gray-ghost bg-white p-6 shadow-lg",
          )}
        >
          <div className="flex flex-col gap-[20px]">
            <div className="flex h-[28px] gap-1">
              <LastPeriodButton
                period="1w"
                setTmpSelectedDate={setTmpSelectedDate}
                setDateRange={setDateRange}
              >
                최근 1주
              </LastPeriodButton>
              <LastPeriodButton
                period="3m"
                setTmpSelectedDate={setTmpSelectedDate}
                setDateRange={setDateRange}
              >
                최근 3개월
              </LastPeriodButton>
            </div>
            <ChangeMonth
              renderMonth={renderMonth}
              setRenderMonth={setRenderMonth}
            />
            <RenderWeek />
            <div className="flex flex-wrap gap-2" role="list">
              {getCalendarDate(renderMonth).map(
                ({ month, date, monthType, dateObj }) => (
                  <RenderDate
                    key={`${month}-${date}`}
                    month={month}
                    date={date}
                    monthType={monthType}
                    dateObj={dateObj}
                    tmpSelectedDate={tmpSelectedDate}
                    setTmpSelectedDate={setTmpSelectedDate}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                  />
                ),
              )}
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <ResetButton handleClick={handleResetDateRange} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
