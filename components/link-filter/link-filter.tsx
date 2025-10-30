import { useCallback, useMemo } from 'react';

import DatePicker from '@/components/datepicker';
import LinkTagSelector from '@/components/link-tag-selector';
import ResetButton from '@/components/reset-button';

import { LinkFilterState, LinkFilterValues } from '@/libs/zustand/schema';

interface Props extends LinkFilterState {
  defaultValues: LinkFilterValues;
  unreadDataTestId?: string;
  dateDataTestId?: string;
  tagDataTestId?: string;
}

// 읽지 않음, 날짜, 태그
export default function LinkFilter(props: Props) {
  const {
    unread,
    dateRange,
    tags,
    setUnread,
    setDateRange,
    setTags,
    defaultValues,
    unreadDataTestId,
    dateDataTestId,
    tagDataTestId,
  } = props;

  const handleClickUnread = useCallback(() => {
    setUnread(!unread);
  }, [unread, setUnread]);

  const handleResetParams = useCallback(() => {
    setUnread(defaultValues.unread);
    setDateRange(defaultValues.dateRange);
    setTags(defaultValues.tags);
  }, [setUnread, setDateRange, setTags, defaultValues]);

  const visibleReset = useMemo(() => {
    return unread || dateRange.length || tags.length;
  }, [unread, dateRange.length, tags.length]);

  return (
    <div className="flex items-center gap-6">
      <div className="flex shrink-0 items-center gap-2">
        {/* 읽지 않음 */}
        <label className="flex items-center gap-2" htmlFor="unread-radio">
          <input
            readOnly
            checked={unread}
            className="peer sr-only"
            data-testid={unreadDataTestId}
            id="unread-radio"
            type="radio"
            onClick={handleClickUnread}
          />
          <div className="hidden size-6 items-center justify-center rounded-full border-2 border-gray-500 peer-checked:flex">
            <div className="size-3 rounded-full bg-primary-500" />
          </div>
          <div className="block size-6 items-center justify-center rounded-full border-2 border-gray-500 peer-checked:hidden" />
          <span className="text-18-26 font-semibold tracking-[-0.2px] text-gray-700">읽지 않음</span>
        </label>
      </div>
      {/* 기간 필터 */}
      <DatePicker dataTestId={dateDataTestId} dateRange={dateRange} setDateRange={setDateRange} />
      {/* 태그 필터 */}
      <LinkTagSelector className="w-76.25" dataTestId={tagDataTestId} setTags={setTags} tags={tags} />
      {/* 초기화 */}
      {visibleReset ? <ResetButton onClick={handleResetParams} /> : undefined}
    </div>
  );
}
