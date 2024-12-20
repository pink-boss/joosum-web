import { WEEK } from "../../constants";

export default function RenderWeek() {
  return (
    <div className="text-gray-silver flex gap-2 text-center text-xs font-semibold">
      {WEEK.map((day) => (
        <span key={day} className="w-[30px]">
          {day}
        </span>
      ))}
    </div>
  );
}
