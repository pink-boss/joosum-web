import { ReactNode } from "react";

import { DateRange } from "@/types/date.types";

type InputProps = {
  period: "1w" | "3m";
  setTmpSelectedDate: (tmpSelectedDate: Date | null) => void;
  children: ReactNode;
  setDateRange: (dateRange: DateRange) => void;
};

export default function LastPeriodButton({
  period,
  setTmpSelectedDate,
  children,
  setDateRange,
}: InputProps) {
  const today = new Date(new Date().toDateString());

  const handleClickLastPeriod = () => {
    const startDate = new Date(today);
    if (period === "1w") {
      startDate.setDate(today.getDate() - 7);
    } else {
      startDate.setMonth(today.getMonth() - 3);
    }
    setTmpSelectedDate(null);
    setDateRange([startDate, today]);
  };
  return (
    <button
      className="w-[127px] flex-1 rounded border border-gray-vapor px-2 py-1 text-xs"
      onClick={handleClickLastPeriod}
    >
      {children}
    </button>
  );
}
