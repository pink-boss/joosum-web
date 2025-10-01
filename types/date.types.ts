export type MonthType = 'next' | 'prev' | 'this';

export type RenderDateType = {
  date: number;
  dateObj: Date;
  month: number;
  monthType: MonthType;
};

export type DateValue = Date | string;

export type DateRange = [] | [DateValue, DateValue] | [DateValue];
