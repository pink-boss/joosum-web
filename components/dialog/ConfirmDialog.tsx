import clsx from "clsx";
import Dialog, { InputProps as DialogInputProps } from "./Dialog";
import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

type InputProps = DialogInputProps & {
  children: ReactNode;
  close: ButtonProps;
  submit: ButtonProps;
};

export default function ConfirmDialog({
  children,
  close,
  submit,
  ...dialogProps
}: InputProps) {
  return (
    <Dialog className="w-[421.78px]" {...dialogProps}>
      <div className="flex flex-col items-center gap-5">
        {children}
        <div className="mt-3 flex justify-center gap-1">
          <button
            {...close}
            className={clsx(
              "h-[56px] w-[164.89px] rounded-lg bg-[#BBBBBB] font-bold text-white",
              close.className && close.className,
            )}
          />
          <button
            {...submit}
            className={clsx(
              "h-[56px] w-[164.89px] rounded-lg font-bold text-white",
              "bg-primary",
              submit.className && submit.className,
            )}
          />
        </div>
      </div>
    </Dialog>
  );
}
