import { ReactNode } from 'react';

import ButtonLoading from '@/components/button-loading';

interface Props {
  children: ReactNode;
  loading: boolean;
  onClick: () => void;
  title?: string;
  dataTestId?: string;
}

export default function LinkDrawerPrimaryButton({ title, loading, onClick, children, dataTestId }: Props) {
  return (
    <button
      className="flex h-14 w-[220.5px] items-center justify-center gap-2 rounded-lg bg-primary-500 text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
      data-testid={dataTestId}
      disabled={loading || !title}
      type="button"
      onClick={onClick}
    >
      <span className="text-16-24 font-bold tracking-[-0.2px] text-inherit">{children}</span>
      <ButtonLoading loading={loading} />
    </button>
  );
}
