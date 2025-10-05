import Image from 'next/image';

import { useCallback } from 'react';

import clsx from 'clsx';

import { useDrawerStore } from '@/libs/zustand/store';

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
      <Image unoptimized alt="user" height={48} src="/icons/user.svg" width={48} />
    </button>
  );
}
