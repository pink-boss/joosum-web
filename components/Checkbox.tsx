import clsx from "clsx";
import { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Checkbox(props: InputProps) {
  return (
    <input
      type="checkbox"
      className={clsx(
        "h-[20px] w-[20px] rounded border border-[#BBBBBB]",
        "relative appearance-none checked:after:absolute",
        "checked:bg-primary checked:after:content-['']",
        "checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2",
        "checked:after:h-[8.93px] checked:after:w-[9.12px] checked:after:bg-[url('/icons/checkmark.png')]",
      )}
      {...props}
    />
  );
}
