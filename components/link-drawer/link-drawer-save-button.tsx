import { useCallback } from 'react';

import clsx from 'clsx';

import { useDrawerStore } from '@/libs/zustand/store';

interface Props {
  dataTestId?: string;
}

export default function LinkDrawerSaveButton({ dataTestId }: Props) {
  const { openLinkDrawer } = useDrawerStore();

  const handleClick = useCallback(() => {
    openLinkDrawer(true, 'save');
  }, [openLinkDrawer]);

  return (
    <button
      data-testid={dataTestId}
      type="button"
      onClick={handleClick}
      className={clsx(
        'h-12 w-auto rounded-xl bg-black font-bold text-white',
        'min-w-30 px-4 text-sm',
        'sm:min-w-40 sm:text-lg',
        'lg:min-w-50 lg:text-xl',
      )}
    >
      <span className="inline">링크 저장</span>
    </button>
  );
}
