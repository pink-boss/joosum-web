import clsx from "clsx";
import { InputHTMLAttributes } from "react";

type InputProps = {
  label: string;
  name: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement> & {
    ref?: React.ForwardedRef<HTMLInputElement>;
  };
};
export default function FormItem({ label, name, inputProps }: InputProps) {
  return (
    <div className="flex flex-col gap-2 text-gray-black">
      <label htmlFor={name} className="px-2 text-lg font-semibold">
        {label}
      </label>
      <input
        data-testid={name}
        id={name}
        name={name}
        className={clsx(
          "h-[48px] w-full p-3",
          "rounded-lg border border-gray-ghost bg-gray-ghost",
        )}
        {...inputProps}
      />
    </div>
  );
}
