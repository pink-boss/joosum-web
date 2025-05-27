import { Field } from "@/store/link-sort/schema";

export const WEEK = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const sortOptions: OptionItem<Field>[] = [
  { label: "최신순", value: "lastest" },
  { label: "오래된순", value: "oldest" },
  { label: "제목순", value: "title" },
  { label: "많이본순", value: "mostViewd" },
];
