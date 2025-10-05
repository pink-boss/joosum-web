import { ButtonHTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

import ButtonLoading from '@/components/button-loading';
import { Dialog, DialogProps } from '@/components/dialog';

// TODO: 로딩 상태 왜 안나오지
interface Props extends DialogProps {
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
    <Dialog className="w-[421.78px]" {...dialogProps}>
      <div className="flex flex-col items-center gap-5">
        {children}
        <div className="mt-3 flex justify-center gap-1">
          <CloseButton {...closeProps} dataTestId={cancelDataTestId} />
          <SubmitButton {...submitProps} dataTestId={submitDataTestId} loading={submitLoading} />
        </div>
      </div>
    </Dialog>
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
        'flex h-[56px] w-[164.89px] items-center justify-center gap-2 rounded-lg font-bold text-white',
        loading ? 'cursor-not-allowed bg-gray-vapor' : 'bg-gray-silver',
        className,
      )}
    >
      <span>{children}</span>
      <ButtonLoading loading={!!loading} />
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
        'flex h-[56px] w-[164.89px] items-center justify-center gap-2 rounded-lg font-bold',
        loading || props.disabled ? 'cursor-not-allowed bg-gray-vapor text-gray-silver' : 'bg-primary-500 text-white',
        className,
      )}
    >
      <span>{children}</span>
      <ButtonLoading loading={!!loading} />
    </button>
  );
}
