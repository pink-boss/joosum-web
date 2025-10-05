import Image from 'next/image';

import { Dispatch, SetStateAction, useCallback } from 'react';

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
        <Image alt="month-left" height={24} src="/icons/icon-chevron-left.png" width={24} />
      </button>
      <span className="font-bold text-gray-black">
        {renderMonth.getFullYear()}년 {renderMonth.getMonth() + 1}월
      </span>
      <button type="button" onClick={() => handleClick('next')}>
        <Image alt="month-right" height={24} src="/icons/icon-chevron-right.png" width={24} />
      </button>
    </div>
  );
}
