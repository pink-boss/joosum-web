import { ButtonHTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

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
    <PrimaryUIButton dataTestId={dataTestId} disabled={loading || !title} loading={loading || !title} onClick={onClick}>
      <span>{children}</span>
      <ButtonLoading loading={loading} />
    </PrimaryUIButton>
  );
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
  title?: string;
  dataTestId?: string;
}

function PrimaryUIButton({ loading, dataTestId, ...props }: Props) {
  return (
    <button
      {...props}
      data-testid={dataTestId}
      type="button"
      className={clsx(
        'h-14 w-[220.5px] rounded-lg font-bold text-white',
        'flex items-center justify-center gap-2',
        loading ? 'cursor-not-allowed bg-gray-300' : 'bg-primary-500',
      )}
    />
  );
}
