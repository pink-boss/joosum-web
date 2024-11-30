import { LinkBook } from "@/app/my-folder/type";

export const longTitleLinkBook: LinkBook = {
  backgroundColor: "#F8F9FA",
  createdAt: "2024-11-26T09:30:00.000Z",
  illustration: "https://picsum.photos/374/180",
  isDefault: "true",
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
  illustration: "https://picsum.photos/374/181",
  isDefault: "false",
  lastSavedAt: "2024-11-26T08:15:00.000Z",
  linkBookId: "lb_002",
  linkCount: 8,
  title: "주간 독서 목록",
  titleColor: "#FFFFFF",
  userId: "user_123",
};

export const mockLinkBooks: LinkBook[] = [
  longTitleLinkBook,
  shortTitleLinkBook,
  {
    backgroundColor: "#FAFAFA",
    createdAt: "2024-11-24T11:45:00.000Z",
    illustration: "https://picsum.photos/374/182",
    isDefault: "false",
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
    illustration: "https://picsum.photos/374/183",
    isDefault: "false",
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
    illustration: "https://picsum.photos/374/184",
    isDefault: "false",
    lastSavedAt: "2024-11-24T19:55:00.000Z",
    linkBookId: "lb_005",
    linkCount: 10,
    title: "여행 계획",
    titleColor: "#FFFFFF",
    userId: "user_123",
  },
];
