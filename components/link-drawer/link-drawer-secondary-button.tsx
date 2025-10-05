import { ReactNode } from 'react';

import clsx from 'clsx';

import ButtonLoading from '@/components/button-loading';

interface Props {
  children: ReactNode;
  loading: boolean;
  onClick: () => void;
  dataTestId?: string;
}

export default function LinkDrawerSecondaryButton({ loading, onClick, children, dataTestId }: Props) {
  return (
    <button
      data-testid={dataTestId}
      disabled={loading}
      type="button"
      onClick={onClick}
      className={clsx(
        'h-[56px] w-[220.5px] rounded-lg font-bold text-white',
        'flex items-center justify-center gap-2',
        loading ? 'cursor-not-allowed bg-gray-vapor' : 'bg-gray-silver',
      )}
    >
      <span>{children}</span>
      <ButtonLoading loading={loading} />
    </button>
  );
}
