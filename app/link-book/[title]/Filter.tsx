import { useMemo } from "react";

import { defaultValues, useLinkFilterStore } from "@/store/useLinkFilterStore";

import DatePicker from "./date-picker";
import ResetButton from "./ResetButton";
import TagSelector from "./tag-selector";

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
      <div className="flex shrink-0 items-center gap-2">
        <input
          type="radio"
          id="unread-radio"
          className="size-6 accent-primary-500"
          onClick={handleClickUnread}
          readOnly
          checked={unread}
        />
        <label
          htmlFor="unread-radio"
          className="text-lg font-semibold text-gray-dim"
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
