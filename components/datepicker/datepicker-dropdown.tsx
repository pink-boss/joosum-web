import Image from 'next/image';

import { useCallback } from 'react';

import clsx from 'clsx';

import { dateFormatter } from '@/utils/date';

import { DateRange } from '@/types/date.types';

interface Props {
  dataTestId?: string;
  isOpen: boolean | undefined;
  selected: DateRange;
  setIsOpen: (isOpen: boolean) => void;
}

export default function DatePickerDropdown({ selected, isOpen, setIsOpen, dataTestId }: Props) {
  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <button
      data-testid={dataTestId}
      type="button"
      onClick={handleClick}
      className={clsx(
        'flex items-center px-3 text-sm text-gray-dim',
        'h-[46px] w-full rounded-lg border border-gray-silver',
      )}
    >
      {selected.length ? (
        <span>
          {selected[0] && dateFormatter(selected[0], 'numeric')}
          {selected[1] && ` ~ ${dateFormatter(selected[1], 'numeric')}`}
        </span>
      ) : (
        <span>기간 전체</span>
      )}
      <Image alt="down" className="ml-auto" height={20} src="/icons/icon-down3.png" width={20} />
    </button>
  );
}
