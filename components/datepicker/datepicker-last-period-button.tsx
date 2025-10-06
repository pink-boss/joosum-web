import { ReactNode, useCallback } from 'react';

import { DateRange } from '@/types/date.types';

interface Props {
  children: ReactNode;
  period: '1w' | '3m';
  setDateRange: (dateRange: DateRange) => void;
  setTmpSelectedDate: (tmpSelectedDate: Date | null) => void;
}

const TODAY = new Date(new Date().toDateString());

export default function DatePickerLastPeriodButton({ period, setTmpSelectedDate, children, setDateRange }: Props) {
  const handleClick = useCallback(() => {
    const startDate = new Date(TODAY);
    if (period === '1w') {
      startDate.setDate(TODAY.getDate() - 7);
    } else {
      startDate.setMonth(TODAY.getMonth() - 3);
    }
    setTmpSelectedDate(null);
    setDateRange([startDate, TODAY]);
  }, [period, setTmpSelectedDate, setDateRange]);

  return (
    <button
      className="w-31.75 flex-1 rounded border border-gray-300 px-2 py-1 text-xs"
      type="button"
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
