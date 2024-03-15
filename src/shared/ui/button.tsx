import classnames from "classnames";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: "primary";
}

export const Button = ({ color, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={classnames(
        color === "primary" && "bg-primary-500 text-white",
        "rounded-[8px] py-[12px] px-[18px] text-[16px] font-bold drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)]",
        className,
      )}
      {...rest}
    />
  );
};
