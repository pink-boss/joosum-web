import { PropsWithChildren } from "react";

interface UsageCardProps extends PropsWithChildren {}

export const UsageCard = ({ children }: UsageCardProps) => {
  return (
    <div className="bg-gray-200 w-[283px] h-[420px] rounded-[24px] pt-6 px-5 flex flex-col">
      {children}
    </div>
  );
};

interface UsageCardTitleProps extends PropsWithChildren {}

UsageCard.Title = ({ children }: UsageCardTitleProps) => {
  return (
    <h3 className="text-[20px] text-primary-500 font-bold leading-[24px] mb-1">
      {children}
    </h3>
  );
};

interface UsageCardDescriptionProps extends PropsWithChildren {}

UsageCard.Description = ({ children }: UsageCardDescriptionProps) => {
  return (
    <p className="text-[#555] text-[15px] font-normal leading-[18px]">
      {children}
    </p>
  );
};

UsageCard.Image = () => {
  return (
    <div className="flex w-full justify-center mb-0 mt-auto">
      <div className="bg-white rounded-t-[20px] w-[181px] h-[274px]"></div>
    </div>
  );
};
