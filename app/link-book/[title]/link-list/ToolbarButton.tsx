import clsx from "clsx";
import { ReactNode } from "react";

type ButtonInputProps = {
  children: ReactNode;
  isPrimary?: boolean;
  handleClick: () => void;
};

export default function ToolbarButton({
  children,
  isPrimary = false,
  handleClick,
}: ButtonInputProps) {
  return (
    <button
      className={clsx(
        "rounded border border-gray-vapor px-9 py-1.5 text-xs",
        isPrimary ? "bg-gray-black text-white" : "bg-white text-black",
      )}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
