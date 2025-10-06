import { Dispatch, SetStateAction, useCallback } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons';

interface Props {
  renderMonth: Date;
  setRenderMonth: Dispatch<SetStateAction<Date>>;
}

export default function DatePickerChangeMonth({ renderMonth, setRenderMonth }: Props) {
  const handleClick = useCallback(
    (changeType: 'next' | 'prev') => {
      setRenderMonth((current) => {
        const nextMonth = current.getMonth() + (changeType === 'prev' ? -1 : 1);
        return new Date(current.getFullYear(), nextMonth);
      });
    },
    [setRenderMonth],
  );

  return (
    <div className="flex items-center justify-between">
      <button type="button" onClick={() => handleClick('prev')}>
        <ChevronLeftIcon aria-hidden="true" className="size-6 text-gray-500" />
      </button>
      <span className="font-bold text-gray-900">
        {renderMonth.getFullYear()}년 {renderMonth.getMonth() + 1}월
      </span>
      <button type="button" onClick={() => handleClick('next')}>
        <ChevronRightIcon aria-hidden="true" className="size-6 text-gray-500" />
      </button>
    </div>
  );
}
