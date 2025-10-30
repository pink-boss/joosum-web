import { ButtonHTMLAttributes, ReactNode } from 'react';

import ButtonLoading from '@/components/button-loading';
import { DefaultDialog, DefaultDialogProps } from '@/components/default-dialog';

import { clsx } from '@/utils/clsx';

// TODO: 로딩 상태 왜 안나오지
interface Props extends DefaultDialogProps {
  children: ReactNode;
  closeProps: ButtonProps;
  submitLoading?: boolean;
  submitProps: ButtonProps;
  cancelDataTestId?: string;
  submitDataTestId?: string;
}

export default function ConfirmDialog({
  children,
  closeProps,
  submitProps,
  submitLoading = false,
  cancelDataTestId,
  submitDataTestId,
  ...dialogProps
}: Props) {
  return (
    <DefaultDialog className="w-[421.78px]" {...dialogProps}>
      <div className="flex flex-col items-center gap-5">
        {children}
        <div className="mt-3 flex justify-center gap-1">
          <CloseButton {...closeProps} dataTestId={cancelDataTestId} />
          <SubmitButton {...submitProps} dataTestId={submitDataTestId} loading={submitLoading} />
        </div>
      </div>
    </DefaultDialog>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type LoadingButtonProps = ButtonProps & {
  children?: ReactNode;
  dataTestId?: string;
  loading?: boolean;
};

function CloseButton({ loading, children, className, dataTestId, ...props }: LoadingButtonProps) {
  return (
    <button
      {...props}
      data-testid={dataTestId}
      disabled={loading || props.disabled}
      type="button"
      className={clsx(
        'flex h-14 w-[164.89px] items-center justify-center gap-2 rounded-lg bg-gray-500 text-white transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500',
        className && className,
      )}
    >
      <span className="text-16-24 font-bold tracking-[-0.2px] text-inherit">{children}</span>
    </button>
  );
}

function SubmitButton({ loading, children, className, dataTestId, ...props }: LoadingButtonProps) {
  return (
    <button
      {...props}
      data-testid={dataTestId}
      disabled={loading || props.disabled}
      type="button"
      className={clsx(
        'flex h-14 w-[164.89px] items-center justify-center gap-2 rounded-lg bg-primary-500 text-white transition-colors hover:bg-primary-600 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500',
        className && className,
      )}
    >
      <span className="text-16-24 font-bold tracking-[-0.2px] text-inherit">{children}</span>
      <ButtonLoading loading={!!loading} />
    </button>
  );
}
