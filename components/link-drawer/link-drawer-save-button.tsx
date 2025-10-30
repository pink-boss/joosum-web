import { useCallback } from 'react';

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
      className="h-12 w-auto min-w-30 rounded-xl bg-black px-4 lg:min-w-50"
      data-testid={dataTestId}
      type="button"
      onClick={handleClick}
    >
      <span className="text-20-24 font-bold tracking-[-0.2px] text-white">링크 저장</span>
    </button>
  );
}
