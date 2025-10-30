'use client';

import { useMemo, useState } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { clsx } from '@/utils/clsx';

import { ChevronDownIcon } from '@/assets/icons';

interface Props {
  options: OptionItem[];
  selected: string;
  setSelected: (option: string) => void;
  dataTestId?: string;
}

export default function Dropdown({ selected, setSelected, options, dataTestId }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = useMemo(() => options.find(({ value }) => selected === value), [options, selected]);

  return (
    <DropdownMenu.Root modal={true} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <button className="flex h-6 items-center p-1 font-normal text-gray-800" data-testid={dataTestId} type="button">
          <span>{selectedOption?.label}</span>
          <ChevronDownIcon
            aria-hidden="true"
            className={clsx('size-6 text-gray-500 transition-transform duration-200', isOpen && 'rotate-180')}
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="flex min-w-22 flex-col space-y-2 rounded-lg border border-gray-200 bg-white py-5 shadow-2-16-19-0"
          sideOffset={4}
        >
          {options.map((item, index) => (
            <DropdownMenu.Item key={index} className="w-full px-5" onSelect={() => setSelected(item.value)}>
              <span
                className={clsx(
                  'whitespace-nowrap text-left text-14-22 font-normal',
                  selected === item.value ? 'font-bold text-gray-800' : 'text-gray-700',
                )}
              >
                {item.label}
              </span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
