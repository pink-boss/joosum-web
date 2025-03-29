import { InputError } from "@/types/form.types";
import clsx from "clsx";
import { InputHTMLAttributes } from "react";

type InputProps = {
  label: string;
  name: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement> & {
    ref?: React.ForwardedRef<HTMLInputElement>;
  };
  error: InputError;
};
export default function FormItem({
  label,
  name,
  inputProps,
  error,
}: InputProps) {
  return (
    <div className="flex flex-col text-gray-black">
      <label htmlFor={name} className="px-2 text-lg font-semibold">
        {label}
      </label>
      <input
        data-testid={name}
        id={name}
        name={name}
        className={clsx(
          "mt-1 h-[48px] w-full p-3",
          "rounded-lg border border-gray-ghost bg-gray-ghost",
          inputProps?.disabled && "text-gray-slate",
        )}
        {...inputProps}
      />
      {error.status === true && (
        <div className="mt-0.5 pl-1 text-xs text-error">{error.message}</div>
      )}
    </div>
  );
}
