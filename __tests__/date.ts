import { describe, expect, test } from '@jest/globals';

import { dateFormatter, getCalendarDate, isBetween, isSameDate, krDateFormatter } from '@/utils/date';

describe('캘린더 날짜 렌더링', () => {
  test('2024.12.', () => {
    const mocks_2024_12 = new Array(31).fill(1).map((date, index) => date + index);
    const mocks_2025_01 = [1, 2, 3, 4];
    const monthDateMocks_2024_12 = [...mocks_2024_12, ...mocks_2025_01];

    const date = new Date('2024.12.9');
    expect(getCalendarDate(date).map(({ date }) => date)).toEqual(monthDateMocks_2024_12);
  });

  test('2025.01.', () => {
    const mocks_2024_12 = [29, 30, 31];
    const mocks_2025_01 = new Array(31).fill(1).map((date, index) => date + index);
    const mocks_2025_02 = [1];
    const monthDateMocks_2025_01 = [...mocks_2024_12, ...mocks_2025_01, ...mocks_2025_02];

    const date = new Date('2025.1.18');
    expect(getCalendarDate(date).map(({ date }) => date)).toEqual(monthDateMocks_2025_01);
  });
});

describe('날짜 포맷', () => {
  const dateString = '2024.12.10';
  const date_2024_12_10 = new Date(dateString);
  test('한글 날짜', () => {
    expect(krDateFormatter(date_2024_12_10)).toBe('2024년 12월 10일');
  });

  test('짧은 연, 월, 일', () => {
    expect(dateFormatter(dateString, '2-digit')).toBe('24. 12. 10');
    expect(dateFormatter(date_2024_12_10, '2-digit')).toBe('24. 12. 10');
  });

  test('긴 연, 월, 일', () => {
    expect(dateFormatter(dateString, 'numeric')).toBe('2024. 12. 10');
    expect(dateFormatter(date_2024_12_10, 'numeric')).toBe('2024. 12. 10');
  });
});

describe('날짜 비교', () => {
  test('동등', () => {
    expect(isSameDate(new Date('2024.12.10'), new Date('2024.12.10'))).toBeTruthy();
    expect(isSameDate(new Date('2024.12.10'), new Date('2025.12.10'))).toBeFalsy();
  });

  test('시작 날짜 ~ 종료 날짜', () => {
    const startDate = new Date('2024.12.10');
    const endDate = new Date('2024.12.17');
    expect(isBetween(new Date('2024.12.15'), startDate, endDate)).toBeTruthy();

    expect(isBetween(new Date('2024.01.1'), startDate, endDate)).toBeFalsy();
    expect(isBetween(new Date('2025.12.15'), startDate, endDate)).toBeFalsy();
  });
});
