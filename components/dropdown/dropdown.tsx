'use client';

import { useCallback, useMemo, useState } from 'react';

import clsx from 'clsx';

import { useClickAway } from '@/hooks/utils';

import { ChevronDownIcon } from '@/assets/icons';

interface Props {
  options: OptionItem[];
  selected: string;
  setSelected: (option: string) => void;
  dataTestId?: string;
}

const Dropdown = ({ selected, setSelected, options, dataTestId }: Props) => {
  const ref = useClickAway({ onClose: () => setIsOpen(false) });

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  const selectedOption = useMemo(() => options.find(({ value }) => selected === value), [options, selected]);

  return (
    <div ref={ref} className="relative h-fit">
      <button
        className="flex h-6 items-center p-1 font-semibold text-gray-700"
        data-testid={dataTestId}
        type="button"
        onClick={handleClick}
      >
        <span>{selectedOption?.label}</span>
        <ChevronDownIcon aria-hidden="true" className="size-6 text-gray-500" />
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-1 flex min-w-32 flex-col rounded-lg border border-gray-200 bg-white py-4 shadow-xl">
          {options.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setSelected(item.value);
                setIsOpen(false);
              }}
              className={clsx(
                'w-full px-5 py-1 text-left leading-5',
                selected === item.value ? 'font-bold text-gray-900' : 'text-gray-700',
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
