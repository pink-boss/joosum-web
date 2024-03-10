import LogoImage from "@/assets/images/logo.png";

export const Logo = () => {
  return (
    <img
      src={LogoImage}
      width={32}
      height={32}
      alt=""
      className="w-[32px] h-[32px] m-[8px]"
    />
  );
};
