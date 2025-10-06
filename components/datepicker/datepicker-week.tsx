import { WEEK } from '@/constants';

export default function DatePickerWeek() {
  return (
    <div className="flex gap-2 text-center text-xs font-semibold text-gray-500">
      {WEEK.map((day) => (
        <span key={day} className="w-7.5">
          {day}
        </span>
      ))}
    </div>
  );
}
