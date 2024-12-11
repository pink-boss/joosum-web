import { useLinkFilterStore } from "@/store/useLinkFilterStore";

type InputProps = {
  setTmpSelectedDate: (tmpSelectedDate: Date | null) => void;
};

export default function ClickLastPeriod({ setTmpSelectedDate }: InputProps) {
  const { setDateRange } = useLinkFilterStore();
  const today = new Date(new Date().toDateString());

  const handleClickLastPeriod = (period: "1w" | "3m") => {
    const startDate = new Date(today);
    if (period === "1w") {
      startDate.setDate(today.getDate() - 7);
    } else {
      startDate.setMonth(today.getMonth() - 3);
    }
    setTmpSelectedDate(null);
    setDateRange([startDate, today]);
  };
  return (
    <div className="flex h-[28px] gap-1">
      <button
        className="w-[127px] flex-1 rounded border border-background-menu px-2 py-1 text-xs"
        onClick={() => handleClickLastPeriod("1w")}
      >
        최근 1주
      </button>
      <button
        className="w-[127px] flex-1 rounded border border-background-menu px-2 py-1 text-xs"
        onClick={() => handleClickLastPeriod("3m")}
      >
        최근 3개월
      </button>
    </div>
  );
}
