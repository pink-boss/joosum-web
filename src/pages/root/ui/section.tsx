import classnames from "classnames";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  color: "primary-500" | "primary-100" | "white";
}

export const Section = ({ color, children, className }: SectionProps) => {
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
