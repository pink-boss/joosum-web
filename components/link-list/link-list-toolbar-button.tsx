import { ReactNode } from 'react';

import { clsx } from '@/utils/clsx';

interface Props {
  children: ReactNode;
  dataTestId?: string;
  isPrimary?: boolean;
  onClick: () => void;
}

export default function LinkListToolbarButton({ children, isPrimary = false, onClick, dataTestId }: Props) {
  return (
    <button
      data-testid={dataTestId}
      type="button"
      onClick={onClick}
      className={clsx(
        'rounded border border-gray-300 px-9 py-1.5',
        isPrimary ? 'bg-gray-900 text-white' : 'bg-white text-black',
      )}
    >
      <span className="text-12-20 font-normal tracking-[-0.2px] text-inherit">{children}</span>
    </button>
  );
}
