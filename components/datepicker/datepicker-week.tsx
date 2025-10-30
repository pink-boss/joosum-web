import { WEEK } from '@/constants';

export default function DatePickerWeek() {
  return (
    <div className="flex items-center gap-2">
      {WEEK.map((day) => (
        <span key={day} className="w-7.5 text-center text-14-22 font-semibold tracking-[-0.2px] text-gray-500">
          {day}
        </span>
      ))}
    </div>
  );
}
