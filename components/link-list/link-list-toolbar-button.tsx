import { ReactNode } from 'react';

import clsx from 'clsx';

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
        'rounded border border-gray-300 px-9 py-1.5 text-xs',
        isPrimary ? 'bg-gray-900 text-white' : 'bg-white text-black',
      )}
    >
      {children}
    </button>
  );
}
