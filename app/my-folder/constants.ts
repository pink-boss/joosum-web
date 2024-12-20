import { Sort } from "@/store/useLinkBookSortStore";

export const pickBackgroundColors = [
  "#C295EC",
  "#9098F7",
  "#7EBCFF",
  "#6FDAE6",
  "#FF6E70",
  "#FF8AB1",
  "#FF8F5B",
  "#FFD56E",
  "#82DE8E",
  "#C8E77A",
  "#A4A4A4",
  "#F6F6F6",
];

export const pickTitleColors = ["#FFFFFF", "#000000"];

export const pickIllustrations = [
  "",
  "illust1",
  "illust2",
  "illust3",
  "illust4",
  "illust5",
  "illust6",
  "illust7",
  "illust8",
  "illust9",
  "illust10",
  "illust11",
];

export const sortOptions: OptionItem<Sort>[] = [
  { label: "생성순", value: "created_at" },
  { label: "제목순", value: "title" },
  { label: "업데이트순", value: "last_saved_at" },
];
