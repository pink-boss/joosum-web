import { MonthType } from '@/types/date.types';

export const krDateFormatter = (date: Date | string) =>
  new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));

export const dateFormatter = (date: Date | string, year: '2-digit' | 'numeric') =>
  new Intl.DateTimeFormat('ko-KR', {
    year,
    month: '2-digit',
    day: '2-digit',
    formatMatcher: 'best fit',
  })
    .format(typeof date === 'string' ? new Date(date) : date)
    .slice(0, -1);

const WEEK = 7;
const MONTH = 12;

export const getCalendarDate = (date: Date) => {
  const prevLastDate = new Date(date.getFullYear(), date.getMonth(), 0);
  const thisFirstDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const thisLastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const nextFirstDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);

  const prevMonthDateCount = thisFirstDate.getDay() % WEEK;
  const thisMonthDateCount = thisLastDate.getDate();
  const nextMonthDateCount = WEEK - ((prevMonthDateCount + thisMonthDateCount) % WEEK);

  function generateMonthDate(count: number, baseDate: Date, monthType: MonthType) {
    return new Array(count).fill(baseDate).map((_date, index) => {
      const copyDate = new Date(_date);
      copyDate.setDate(copyDate.getDate() + (monthType === 'prev' ? -index : index));
      return {
        month: (copyDate.getMonth() % MONTH) + 1,
        date: copyDate.getDate(),
        monthType,
        dateObj: copyDate,
      };
    });
  }

  return [
    ...generateMonthDate(prevMonthDateCount, prevLastDate, 'prev').reverse(),
    ...generateMonthDate(thisMonthDateCount, thisFirstDate, 'this'),
    ...generateMonthDate(nextMonthDateCount, nextFirstDate, 'next'),
  ];
};

export const isSameDate = (date1?: Date, date2?: Date) => {
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
    throw new Error('Arguments must be Date objects');
  }

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const isAfter = (date: Date, baseDate: Date, isIncluded?: boolean) =>
  isIncluded ? date.getTime() > baseDate.getTime() || isSameDate(date, baseDate) : date.getTime() > baseDate.getTime();

export const isBefore = (date: Date, baseDate: Date, isIncluded?: boolean) =>
  isIncluded ? date.getTime() < baseDate.getTime() || isSameDate(date, baseDate) : date.getTime() < baseDate.getTime();

export const isBetween = (date: Date, startDate: Date, endDate: Date, isIncluded?: boolean) =>
  isAfter(date, startDate, isIncluded) && isBefore(date, endDate, isIncluded);
