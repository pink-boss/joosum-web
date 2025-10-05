'use client';
import { useCallback, useState } from 'react';

import clsx from 'clsx';

import ResetButton from '@/components/reset-button';

import { useClickAway } from '@/hooks/utils';
import { getCalendarDate } from '@/utils/date';

import { DateRange } from '@/types/date.types';

import DatePickerChangeMonth from './datepicker-change-month';
import DatePickerDate from './datepicker-date';
import DatePickerDropdown from './datepicker-dropdown';
import DatePickerLastPeriodButton from './datepicker-last-period-button';
import DatePickerWeek from './datepicker-week';

interface Props {
  dataTestId?: string;
  dateRange?: DateRange;
  open?: boolean;
  setDateRange: (dateRange: DateRange) => void;
}

const TODAY = new Date(new Date().toDateString());

export default function DatePicker({ open, dateRange = [], setDateRange, dataTestId }: Props) {
  const ref = useClickAway({ onClose: () => setIsOpen(false) });

  const [isOpen, setIsOpen] = useState(open);
  const [tmpSelectedDate, setTmpSelectedDate] = useState<Date | null>(null);
  const [renderMonth, setRenderMonth] = useState(TODAY);

  const handleReset = useCallback(() => {
    setTmpSelectedDate(null);
    setDateRange([]);
  }, [setDateRange]);

  return (
    <div ref={ref} className="relative w-[305px]">
      {/* 기간 필터 */}
      <DatePickerDropdown dataTestId={dataTestId} isOpen={isOpen} selected={dateRange} setIsOpen={setIsOpen} />
      {isOpen && (
        <div
          className={clsx(
            'absolute z-10 mt-1 flex max-w-min flex-col',
            'gap-[20px] rounded-lg border border-gray-ghost bg-white p-6 shadow-lg',
          )}
        >
          <div className="flex flex-col gap-[20px]">
            <div className="flex h-[28px] gap-1">
              <DatePickerLastPeriodButton
                period="1w"
                setDateRange={setDateRange}
                setTmpSelectedDate={setTmpSelectedDate}
              >
                최근 1주
              </DatePickerLastPeriodButton>
              <DatePickerLastPeriodButton
                period="3m"
                setDateRange={setDateRange}
                setTmpSelectedDate={setTmpSelectedDate}
              >
                최근 3개월
              </DatePickerLastPeriodButton>
            </div>
            <DatePickerChangeMonth renderMonth={renderMonth} setRenderMonth={setRenderMonth} />
            <DatePickerWeek />
            <div className="flex flex-wrap gap-2" role="list">
              {getCalendarDate(renderMonth).map(({ month, date, monthType, dateObj }) => (
                <DatePickerDate
                  key={`${month}-${date}`}
                  date={date}
                  dateObj={dateObj}
                  dateRange={dateRange}
                  month={month}
                  monthType={monthType}
                  setDateRange={setDateRange}
                  setTmpSelectedDate={setTmpSelectedDate}
                  tmpSelectedDate={tmpSelectedDate}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <ResetButton onClick={handleReset} />
          </div>
        </div>
      )}
    </div>
  );
}
