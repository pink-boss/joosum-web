import { Sort } from "@/store/useLinkBookSortStore";

export const pickBackgroundColors = [
  "#91B0C4",
  "#FFFFB4",
  "#F5BAAA",
  "#FFD8BE",
  "#CABCD7",
  "#CCE2CB",
  "#4D6776",
  "#F6B756",
  "#D56573",
  "#FF6854",
  "#A86EA0",
  "#748A7E",
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
