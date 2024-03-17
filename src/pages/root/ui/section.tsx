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
        "flex flex-col py-[60px]",
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
    <h2 className={classnames("text-primary-500", "font-bold ", className)}>
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
          "font-medium text-[20px] leading-[23px] text-black",
          className,
        )}
      >
        {children} <br />
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
        "text-primary-500 leading-[33px] text-[28px]",
        className,
      )}
    >
      {children}
    </span>
  );
};
