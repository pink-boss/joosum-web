import clsx from "clsx";
import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Checkbox(props: InputProps) {
  return (
    <input
      {...props}
      type="checkbox"
      className={clsx(
        "border-gray-silver h-5 w-5 rounded border",
        "relative appearance-none checked:after:absolute",
        "checked:bg-primary-500 checked:after:content-['']",
        "checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2",
        "checked:after:h-[8.93px] checked:after:w-[9.12px] checked:after:bg-[url('/icons/checkmark.png')]",
        props.className && props.className,
      )}
    />
  );
}
