import { LinkBook } from "@/types/linkBook.types";

export const defaultLinkBook: LinkBook = {
  backgroundColor: "#8A8A9A",
  createdAt: "2024-11-22T09:30:00.000Z",
  illustration: null,
  isDefault: "y",
  lastSavedAt: "2024-11-26T09:30:00.000Z",
  linkBookId: "lb_000",
  linkCount: 130,
  title: "기본",
  titleColor: "#FFFFFF",
  userId: "user_123",
};

export const longTitleLinkBook: LinkBook = {
  backgroundColor: "#F8F9FA",
  createdAt: "2024-11-26T09:30:00.000Z",
  illustration: "illust1",
  isDefault: "n",
  lastSavedAt: "2024-11-26T09:30:00.000Z",
  linkBookId: "lb_001",
  linkCount: 12,
  title: "개발 참고 자료 - 가나다라마바사 테스트 자료",
  titleColor: "#FFFFFF",
  userId: "user_123",
};

export const shortTitleLinkBook: LinkBook = {
  backgroundColor: "#E3F2FD",
  createdAt: "2024-11-25T15:20:00.000Z",
  illustration: "illust2",
  isDefault: "n",
  lastSavedAt: "2024-11-26T08:15:00.000Z",
  linkBookId: "lb_002",
  linkCount: 8,
  title: "주간 독서 목록",
  titleColor: "#FFFFFF",
  userId: "user_123",
};

export const mockLinkBooks: LinkBook[] = [
  defaultLinkBook,
  longTitleLinkBook,
  shortTitleLinkBook,
  {
    backgroundColor: "#FAFAFA",
    createdAt: "2024-11-24T11:45:00.000Z",
    illustration: "illust3",
    isDefault: "n",
    lastSavedAt: "2024-11-26T07:20:00.000Z",
    linkBookId: "lb_003",
    linkCount: 15,
    title: "디자인 영감",
    titleColor: "#FFFFFF",
    userId: "user_123",
  },
  {
    backgroundColor: "#FFF3E0",
    createdAt: "2024-11-23T14:10:00.000Z",
    illustration: "illust4",
    isDefault: "n",
    lastSavedAt: "2024-11-25T16:40:00.000Z",
    linkBookId: "lb_004",
    linkCount: 6,
    title: "요리 레시피",
    titleColor: "#FFFFFF",
    userId: "user_123",
  },
  {
    backgroundColor: "#E8F5E9",
    createdAt: "2024-11-22T10:05:00.000Z",
    illustration: "illust5",
    isDefault: "n",
    lastSavedAt: "2024-11-27T19:55:00.000Z",
    linkBookId: "lb_005",
    linkCount: 10,
    title: "여행 계획",
    titleColor: "#FFFFFF",
    userId: "user_123",
  },
];
