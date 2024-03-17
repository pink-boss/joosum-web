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
        "bg-gray-200 m-auto w-[283px] h-[420px] rounded-[24px] pt-6 px-5 flex flex-col",
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
        "text-[20px] font-bold leading-[24px] mb-1",
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
        "text-[#555] text-[15px] font-normal leading-[18px]",
      )}
    >
      {children}
    </p>
  );
};

Card.Image = () => {
  return (
    <div className="flex w-full justify-center mb-0 mt-auto">
      <div className="bg-white rounded-t-[20px] w-[181px] h-[274px]"></div>
    </div>
  );
};
