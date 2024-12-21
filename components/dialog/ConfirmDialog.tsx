import clsx from "clsx";
import { ReactNode, ButtonHTMLAttributes } from "react";

import Dialog, { InputProps as DialogInputProps } from "./Dialog";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function CloseButton(props: ButtonProps) {
  return (
    <button
      className="h-[56px] w-[164.89px] rounded-lg bg-gray-silver font-bold text-white"
      {...props}
    />
  );
}

export function SubmitButton(props: ButtonProps) {
  return (
    <button
      className={clsx([
        "h-[56px] w-[164.89px] rounded-lg font-bold",
        typeof props.disabled === "boolean"
          ? props.disabled
            ? "cursor-not-allowed bg-gray-vapor text-gray-silver"
            : "bg-primary-500 text-white"
          : "bg-primary-500 text-white",
      ])}
      {...props}
    />
  );
}

type InputProps = DialogInputProps & {
  children: ReactNode;
  closeProps: ButtonProps;
  submitProps: ButtonProps;
};

export default function ConfirmDialog({
  children,
  closeProps,
  submitProps,
  ...dialogProps
}: InputProps) {
  return (
    <Dialog className="w-[421.78px]" {...dialogProps}>
      <div className="flex flex-col items-center gap-5">
        {children}
        <div className="mt-3 flex justify-center gap-1">
          <CloseButton {...closeProps} />
          <SubmitButton {...submitProps} />
        </div>
      </div>
    </Dialog>
  );
}
