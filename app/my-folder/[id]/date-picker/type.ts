export type MonthType = "prev" | "this" | "next";

export type RenderDateType = {
  month: number;
  date: number;
  monthType: MonthType;
  dateObj: Date;
};
