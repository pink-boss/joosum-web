import { WEEK } from "@/app/link-book/constants";

export default function RenderWeek() {
  return (
    <div className="flex gap-2 text-center text-xs font-semibold text-gray-silver">
      {WEEK.map((day) => (
        <span key={day} className="w-[30px]">
          {day}
        </span>
      ))}
    </div>
  );
}
