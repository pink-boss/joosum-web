import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

type InputProps = {
  renderMonth: Date;
  setRenderMonth: Dispatch<SetStateAction<Date>>;
};

export default function ChangeMonth({
  renderMonth,
  setRenderMonth,
}: InputProps) {
  const handleChangeMonth = (changeType: "prev" | "next") => {
    setRenderMonth((current) => {
      const nextMonth = current.getMonth() + (changeType === "prev" ? -1 : 1);
      return new Date(current.getFullYear(), nextMonth);
    });
  };

  return (
    <div className="flex items-center justify-between">
      <button onClick={() => handleChangeMonth("prev")}>
        <Image
          src="/icons/icon-chevron-left.png"
          alt="month-left"
          width={24}
          height={24}
        />
      </button>
      <span className="text-gray-black font-bold">
        {renderMonth.getFullYear()}년 {renderMonth.getMonth() + 1}월
      </span>
      <button onClick={() => handleChangeMonth("next")}>
        <Image
          src="/icons/icon-chevron-right.png"
          alt="month-right"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
