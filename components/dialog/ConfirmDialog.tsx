import clsx from "clsx";
import Dialog, { InputProps as DialogInputProps } from "./Dialog";
import { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function CloseButton(props: ButtonProps) {
  return (
    <button
      className="h-[56px] w-[164.89px] rounded-lg bg-[#BBBBBB] font-bold text-white"
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
            ? "cursor-not-allowed bg-background-menu text-[#BBBBBB]"
            : "bg-primary text-white"
          : "bg-primary text-white",
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
