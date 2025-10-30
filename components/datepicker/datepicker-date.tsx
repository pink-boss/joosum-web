import { useCallback, useMemo } from 'react';

import { clsx } from '@/utils/clsx';
import { isAfter, isBefore, isBetween, isSameDate } from '@/utils/date';

import { DateRange, RenderDateType } from '@/types/date.types';

interface Props extends RenderDateType {
  dateRange: DateRange;
  setDateRange: (dateRange: DateRange) => void;
  setTmpSelectedDate: (tmpSelectedDate: Date | null) => void;
  tmpSelectedDate: Date | null;
}

const TODAY = new Date(new Date().toDateString());

export default function DatePickerDate(props: Props) {
  const { month, date, monthType, dateObj, tmpSelectedDate, setTmpSelectedDate, dateRange, setDateRange } = props;

  const { startDate, endDate, greaterThanToday, disabled, isSelectedDate, isDateInRange } = useMemo(() => {
    const startDate = dateRange[0] ? new Date(dateRange[0]) : undefined;
    const endDate = dateRange[1] ? new Date(dateRange[1]) : undefined;

    const greaterThanToday = isAfter(dateObj, TODAY);
    const lessThanSelectedDate = !!tmpSelectedDate && isBefore(dateObj, tmpSelectedDate);
    const disabled = greaterThanToday || lessThanSelectedDate;

    const isSelectedDate = tmpSelectedDate
      ? isSameDate(tmpSelectedDate, dateObj)
      : dateRange.some((_dateRange) => isSameDate(new Date(_dateRange), dateObj));

    const isDateInRange = startDate && endDate && isBetween(dateObj, startDate, endDate, true);

    return { startDate, endDate, greaterThanToday, lessThanSelectedDate, disabled, isSelectedDate, isDateInRange };
  }, [dateRange, dateObj, tmpSelectedDate]);

  const handleClick = useCallback(() => {
    if (tmpSelectedDate) {
      setTmpSelectedDate(null);
      setDateRange([tmpSelectedDate, dateObj]);
    } else {
      setTmpSelectedDate(dateObj);
    }
  }, [tmpSelectedDate, dateObj, setTmpSelectedDate, setDateRange]);

  return (
    <li key={`${month}-${date}`} className="relative">
      {!tmpSelectedDate && isDateInRange && (
        <div
          className={clsx(
            'pointer-events-none absolute inset-0 left-1/2 top-1/2 z-1 h-full -translate-x-1/2 -translate-y-1/2 bg-primary-200',
            isSelectedDate ? 'w-[19.25px]' : 'w-[38.5px]',
            isSameDate(startDate, dateObj) && 'translate-x-0',
            isSameDate(endDate, dateObj) && '-translate-x-full',
            isSameDate(startDate, endDate) && 'hidden',
          )}
        />
      )}
      <button
        disabled={disabled}
        type="button"
        onClick={handleClick}
        className={clsx(
          'relative z-1 size-7.5 text-14-22 font-semibold tracking-[-0.2px]',
          monthType === 'this' ? 'text-gray-800' : 'font-normal text-gray-500',
          greaterThanToday && 'font-normal text-gray-500',
          isSelectedDate && 'size-7.5 rounded-full bg-paperabovebg text-white',
        )}
      >
        {date}
      </button>
    </li>
  );
}
