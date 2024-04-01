import classnames from "classnames";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: "primary" | "white";
}

export const Button = ({ color, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={classnames(
        color === "primary" && "bg-primary-500 text-white",
        color === "white" && "bg-white text-primary-500",
        "rounded-[8px] px-[18px] py-[12px] text-[16px] font-bold leading-[19px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.1)] sm:rounded-[12px] sm:px-5 sm:py-4 sm:text-[24px] sm:leading-[28px]",
        className,
      )}
      {...rest}
    />
  );
};
