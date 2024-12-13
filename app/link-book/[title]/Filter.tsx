import { defaultValues, useLinkFilterStore } from "@/store/useLinkFilterStore";
import DatePicker from "./date-picker";
import TagSelector from "./tag-selector";
import { useMemo } from "react";
import ResetButton from "./ResetButton";

export default function Filter() {
  const { unread, dateRange, tags, setUnread, setDateRange, setTags } =
    useLinkFilterStore();

  const visibleReset = useMemo(() => {
    return unread || dateRange.length || tags.length;
  }, [unread, dateRange.length, tags.length]);

  const handleClickUnread = () => {
    setUnread(!unread);
  };

  const handleResetParams = () => {
    setUnread(defaultValues.unread);
    setDateRange(defaultValues.dateRange);
    setTags(defaultValues.tags);
  };
  return (
    <div className="flex items-center gap-6">
      <div className="flex flex-shrink-0 items-center gap-2">
        <input
          type="radio"
          id="unread-radio"
          className="h-6 w-6 accent-primary"
          onClick={handleClickUnread}
          readOnly
          checked={unread}
        />
        <label
          htmlFor="unread-radio"
          className="text-lg font-semibold text-text-secondary"
        >
          읽지 않음
        </label>
      </div>
      <DatePicker />
      <TagSelector className="w-[305px]" tags={tags} setTags={setTags} />
      {visibleReset ? (
        <ResetButton handleClick={handleResetParams} />
      ) : undefined}
    </div>
  );
}
