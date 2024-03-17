import classnames from "classnames";
import { PropsWithChildren } from "react";

interface UsageItemProps extends PropsWithChildren {
  active?: boolean;
  onClick: () => void;
}

export const UsageItem = ({ active, children, onClick }: UsageItemProps) => {
  return (
    <li
      className={classnames(
        active ? "bg-primary-500 text-white" : "bg-gray-200 text-gray-700",
        "rounded-[50px] py-2 px-3 font-semibold inline-block mr-3 mb-3 leading-[19px]",
      )}
    >
      <button
        onClick={onClick}
        className={classnames(
          active ? "font-bold" : "font-semibold",
          "text-[16px]",
        )}
      >
        {children}
      </button>
    </li>
  );
};
