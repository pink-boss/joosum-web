import classnames from "classnames";
import { PropsWithChildren } from "react";

export const Card = ({
  className,
  children,
}: {
  className?: string;
} & PropsWithChildren) => {
  return (
    <div
      className={classnames(
        className,
        "m-auto flex h-[420px] w-[283px] flex-col rounded-[24px] bg-gray-200 px-5 pt-6 sm:w-[400px] sm:p-[30px]",
      )}
    >
      {children}
    </div>
  );
};

Card.Title = ({
  className,
  children,
}: { className?: string } & PropsWithChildren) => {
  return (
    <h3
      className={classnames(
        className,
        "mb-1 text-[20px] font-bold leading-[24px] sm:text-[24px] sm:leading-[34px]",
      )}
    >
      {children}
    </h3>
  );
};

Card.Description = ({
  className,
  children,
}: { className?: string } & PropsWithChildren) => {
  return (
    <p
      className={classnames(
        className,
        "text-[15px] font-normal leading-[18px] text-[#555] sm:text-[16px] sm:leading-[26px]",
      )}
    >
      {children}
    </p>
  );
};

Card.Image = () => {
  return (
    <div className="mb-0 mt-auto flex w-full justify-center sm:mt-[22px] sm:h-full">
      <div className="h-[274px] w-[181px] rounded-t-[20px] bg-white sm:size-full sm:rounded-b-[20px]"></div>
    </div>
  );
};
