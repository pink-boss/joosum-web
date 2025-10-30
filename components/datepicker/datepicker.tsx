import { DateRange } from '@/types/date.types';

import DatePickerPopover from './datepicker-popover';

interface Props {
  dataTestId?: string;
  dateRange?: DateRange;
  open?: boolean;
  setDateRange: (dateRange: DateRange) => void;
}

// 기간 필터
export default function DatePicker({ dateRange = [], setDateRange, dataTestId }: Props) {
  return (
    <div className="relative w-76.25">
      <DatePickerPopover dataTestId={dataTestId} selected={dateRange} setDateRange={setDateRange} />
    </div>
  );
}
