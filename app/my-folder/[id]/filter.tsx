import DatePicker from "./date-picker";
import TagSelector from "./tag-selector";

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
      <TagSelector totalTags={[]} />
      <div>reset</div>
    </div>
  );
}
