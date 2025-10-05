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
        'h-[48px] w-auto rounded-xl bg-black font-bold text-white',
        'min-w-[120px] px-4 text-sm',
        'sm:min-w-[160px] sm:text-lg',
        'lg:min-w-[200px] lg:text-xl',
      )}
    >
      <span className="inline">링크 저장</span>
    </button>
  );
}
