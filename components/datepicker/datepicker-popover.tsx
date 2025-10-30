'use client';

import { useCallback, useState } from 'react';

import * as Popover from '@radix-ui/react-popover';

import ResetButton from '@/components/reset-button';

import { clsx } from '@/utils/clsx';
import { dateFormatter } from '@/utils/date';
import { getCalendarDate } from '@/utils/date';

import { ChevronDownIcon } from '@/assets/icons';

import { DateRange } from '@/types/date.types';

import DatePickerChangeMonth from './datepicker-change-month';
import DatePickerDate from './datepicker-date';
import DatePickerLastPeriodButton from './datepicker-last-period-button';
import DatePickerWeek from './datepicker-week';

interface Props {
  dataTestId?: string;
  selected: DateRange;
  setDateRange: (dateRange: DateRange) => void;
}

const TODAY = new Date(new Date().toDateString());

export default function DatePickerPopover({ selected, setDateRange, dataTestId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [tmpSelectedDate, setTmpSelectedDate] = useState<Date | null>(null);
  const [renderMonth, setRenderMonth] = useState(TODAY);

  const handleReset = useCallback(() => {
    setTmpSelectedDate(null);
    setDateRange([]);
  }, [setDateRange]);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button
          className="flex h-11.5 w-full items-center rounded-lg border border-gray-500 px-3"
          data-testid={dataTestId}
          type="button"
        >
          {selected.length ? (
            <span className="text-16-24 font-normal tracking-[-0.2px] text-gray-700">
              {selected[0] && dateFormatter(selected[0], 'numeric')}
              {selected[1] && ` ~ ${dateFormatter(selected[1], 'numeric')}`}
            </span>
          ) : (
            <span className="text-16-24 font-normal tracking-[-0.2px] text-gray-700">기간 전체</span>
          )}
          <ChevronDownIcon
            aria-hidden="true"
            className={clsx('ml-auto size-5 text-gray-500 transition-transform duration-200', isOpen && 'rotate-180')}
          />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          className="flex max-w-min flex-col gap-5 rounded-lg border border-gray-200 bg-white p-6 shadow-2-16-19-0"
          sideOffset={4}
        >
          <div className="flex flex-col gap-5">
            <div className="flex h-7 gap-1">
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
            <ul className="flex flex-wrap gap-2">
              {getCalendarDate(renderMonth).map(({ month, date, monthType, dateObj }) => (
                <DatePickerDate
                  key={`${month}-${date}`}
                  date={date}
                  dateObj={dateObj}
                  dateRange={selected}
                  month={month}
                  monthType={monthType}
                  setDateRange={setDateRange}
                  setTmpSelectedDate={setTmpSelectedDate}
                  tmpSelectedDate={tmpSelectedDate}
                />
              ))}
            </ul>
          </div>
          <div className="flex justify-end gap-4">
            <ResetButton onClick={handleReset} />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
