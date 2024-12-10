"use client";
import { useClearDropdown } from "@/hooks/clear-dropdown";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { SelectBox } from "./select-box";
import { useLinkFilterStore } from "@/store/useLinkFilterStore";
import { getCalendarDate } from "@/utils/date";
import RenderDate from "./date";
import ChangeMonth from "./change-month";
import ClickLastPeriod from "./last-period";

const WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function RenderWeek() {
  return (
    <div className="flex gap-2 text-center text-xs font-semibold text-[#BBBBBB]">
      {WEEK.map((day) => (
        <span key={day} className="w-[30px]">
          {day}
        </span>
      ))}
    </div>
  );
}

export type InputProps = {
  open?: boolean;
};

// TODO: dateRange는 두 개 다 있을 때, 서버에 요청 보내기
const DatePicker = ({ open }: InputProps) => {
  const ref = useClearDropdown(() => setIsOpen(false));
  const [isOpen, setIsOpen] = useState(open);
  const { dateRange, setDateRange } = useLinkFilterStore();
  const today = new Date(new Date().toDateString());
  const [renderMonth, setRenderMonth] = useState(today);

  const handleResetDateRange = () => {
    setDateRange([]);
  };
  return (
    <div className="relative" data-testid="date-picker" ref={ref}>
      <SelectBox isOpen={isOpen} setIsOpen={setIsOpen} selected={dateRange} />

      {isOpen && (
        <div
          className={clsx(
            "absolute z-10 mt-1 flex max-w-min flex-col",
            "gap-[20px] rounded-lg border border-background-secondary bg-white p-6 shadow-lg",
          )}
        >
          <div className="flex flex-col gap-[20px]">
            <ClickLastPeriod />
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
                  />
                ),
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <button
              className="flex w-16 items-center gap-1 text-sm font-semibold text-text-secondary"
              onClick={handleResetDateRange}
            >
              <Image
                src="/icons/reset.png"
                alt="reset"
                width={16}
                height={16}
              />
              초기화
            </button>
            <button className="h-[40px] flex-1 rounded-lg bg-primary text-sm font-bold text-white">
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
