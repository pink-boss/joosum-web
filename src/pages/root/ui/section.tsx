import classnames from "classnames";
import { PropsWithChildren } from "react";

export const Section = ({
  color,
  children,
  className,
}: {
  color: "primary-500" | "primary-100" | "white";
  className?: string;
} & PropsWithChildren) => {
  return (
    <section
      className={classnames(
        "flex flex-col py-[60px] sm:py-[100px]",
        color === "primary-500" && "bg-primary-500 text-white",
        color === "primary-100" && "bg-primary-100",
        color === "white" && "bg-white",
        className,
      )}
    >
      {children}
    </section>
  );
};

Section.Title = ({
  className,
  children,
}: { className?: string } & PropsWithChildren) => {
  return (
    <h2
      className={classnames(
        "text-primary-500",
        "font-bold",

        className,
      )}
    >
      {children}
    </h2>
  );
};

Section.TitleSub = ({
  className,
  children,
}: { className?: string } & PropsWithChildren) => {
  return (
    <>
      <span
        className={classnames(
          "text-[20px] font-medium leading-[23px] text-black sm:text-[36px] sm:leading-[42px]",
          className,
        )}
      >
        {children}
      </span>
    </>
  );
};

Section.TitleMain = ({
  className,
  children,
}: { className?: string } & PropsWithChildren) => {
  return (
    <span
      className={classnames(
        "text-[28px] leading-[33px] text-primary-500 sm:text-[36px] sm:leading-[57px]",
        className,
      )}
    >
      {children}
    </span>
  );
};
