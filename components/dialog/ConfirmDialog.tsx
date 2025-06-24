import clsx from "clsx";
import { ReactNode, ButtonHTMLAttributes } from "react";

import ButtonLoading from "@/components/ButtonLoading";

import Dialog, { InputProps as DialogInputProps } from "./Dialog";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type LoadingButtonProps = ButtonProps & {
  loading?: boolean;
  children?: ReactNode;
};

export function CloseButton({
  loading,
  children,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      className={clsx(
        "flex h-[56px] w-[164.89px] items-center justify-center gap-2 rounded-lg font-bold text-white",
        loading ? "cursor-not-allowed bg-gray-vapor" : "bg-gray-silver",
        className,
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      <span>{children}</span>
      <ButtonLoading loading={!!loading} />
    </button>
  );
}

export function SubmitButton({
  loading,
  children,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <button
      className={clsx(
        "flex h-[56px] w-[164.89px] items-center justify-center gap-2 rounded-lg font-bold",
        loading || props.disabled
          ? "cursor-not-allowed bg-gray-vapor text-gray-silver"
          : "bg-primary-500 text-white",
        className,
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      <span>{children}</span>
      <ButtonLoading loading={!!loading} />
    </button>
  );
}

// TODO: 로딩 상태 왜 안나오지
type InputProps = DialogInputProps & {
  children: ReactNode;
  closeProps: ButtonProps;
  submitProps: ButtonProps;
  submitLoading?: boolean;
};

export default function ConfirmDialog({
  children,
  closeProps,
  submitProps,
  submitLoading = false,
  ...dialogProps
}: InputProps) {
  return (
    <Dialog className="w-[421.78px]" {...dialogProps}>
      <div className="flex flex-col items-center gap-5">
        {children}
        <div className="mt-3 flex justify-center gap-1">
          <CloseButton {...closeProps} />
          <SubmitButton {...submitProps} loading={submitLoading} />
        </div>
      </div>
    </Dialog>
  );
}
