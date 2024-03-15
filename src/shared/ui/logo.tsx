import classnames from "classnames";
import LogoImage from "@/assets/images/logo.png";

export interface LogoProps {
  classNames?: Parameters<typeof classnames>[0];
}

export const Logo = ({ classNames }: LogoProps) => {
  return (
    <img
      src={LogoImage}
      width={24}
      height={24}
      alt=""
      className={classnames("w-[24px] h-[24px]", classNames)}
    />
  );
};
