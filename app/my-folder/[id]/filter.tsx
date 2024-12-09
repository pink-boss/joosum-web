import DatePicker from "./date-picker/date-picker";

export default function Filter() {
  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <input type="radio" className="h-6 w-6 accent-primary" />
        <div className="text-lg font-semibold text-text-secondary">
          읽지 않음
        </div>
      </div>
      <DatePicker />
      <div>tags</div>
      <div>reset</div>
    </div>
  );
}
