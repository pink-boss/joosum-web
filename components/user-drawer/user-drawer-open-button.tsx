import { useCallback } from 'react';

import clsx from 'clsx';

import { useDrawerStore } from '@/libs/zustand/store';

import { PersonOutlineIcon } from '@/assets/icons';

interface Props {
  dataTestId?: string;
}

export default function UserDrawerOpenButton({ dataTestId }: Props) {
  const { openUserDrawer } = useDrawerStore();

  const handleClick = useCallback(() => openUserDrawer(true), [openUserDrawer]);

  return (
    <button
      className={clsx('flex cursor-pointer items-center justify-center', 'transition-opacity hover:opacity-80')}
      data-testid={dataTestId}
      type="button"
      onClick={handleClick}
    >
      <div className="flex size-12 items-center justify-center rounded-full border-2 border-white">
        <PersonOutlineIcon aria-hidden="true" className="size-6 text-gray-500" />
      </div>
    </button>
  );
}
