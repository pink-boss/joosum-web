import classnames from "classnames";
import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  color: "primary" | "white";
}

export const Section = ({ color, children, className }: SectionProps) => {
  return (
    <section
      className={classnames(
        "flex flex-col  bg-primary-200 py-[60px]",
        color === "primary" && "bg-primary-200",
        color === "white" && "bg-white",
        className,
      )}
    >
      {children}
    </section>
  );
};
