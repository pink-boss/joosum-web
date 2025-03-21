import { Link } from "@/types/link.types";

import { mockAccount } from "./account.mocks";
import { mockLinkBooks } from "./linkBook.mocks";

const userId = mockAccount.userId;

export const mockLink: Link = {
  createdAt: "2024-03-21T09:00:00Z",
  lastReadAt: "2024-03-21T15:30:00Z",
  linkBookId: mockLinkBooks[3].linkBookId,
  linkBookName: mockLinkBooks[3].title,
  linkId: "link-1",
  readCount: 5,
  tags: ["여행", "패션", "쇼핑"],
  thumbnailURL: "https://picsum.photos/374/184",
  title: "일반 링크",
  updatedAt: "2024-03-21T15:30:00Z",
  url: "https://react.dev",
  userId,
};

export const mockLinks: Link[] = [
  {
    createdAt: "2024-08-22T09:00:00Z",
    lastReadAt: "",
    linkBookId: "book-1",
    linkBookName: "개발 문서",
    linkId: "link-1",
    readCount: 10,
    tags: ["인공지능", "AI"],
    thumbnailURL: "https://picsum.photos/374/185",
    title: "Python 공식 문서",
    updatedAt: "2024-03-22T15:30:00Z",
    url: "https://python.org",
    userId,
  },
  {
    createdAt: "2024-03-21T09:00:00Z",
    lastReadAt: "2024-03-21T15:30:00Z",
    linkBookId: "book-1",
    linkBookName: "개발 문서",
    linkId: "link-1",
    readCount: 5,
    tags: ["생산성", "공부", "인공지능"],
    thumbnailURL: "https://picsum.photos/374/184",
    title:
      "React 공식 문서 - 가나다라마바사아자차카타파하 아야어요우유 테스트 자료",
    updatedAt: "2024-03-21T15:30:00Z",
    url: "https://react.dev",
    userId,
  },
  {
    createdAt: "2024-03-22T09:00:00Z",
    lastReadAt: "",
    linkBookId: "book-1",
    linkBookName: "테스트 문서",
    linkId: "link-1",
    readCount: 0,
    tags: ["생산성", "공부", "인공지능", "AI", "여행", "패션", "쇼핑"],
    thumbnailURL: "https://picsum.photos/374/185",
    title: "읽은 횟수 최저",
    updatedAt: "2024-03-22T15:30:00Z",
    url: "https://python.org",
    userId,
  },
  {
    createdAt: "2024-03-24T09:00:00Z",
    lastReadAt: "",
    linkBookId: "book-1",
    linkBookName: "테스트 문서",
    linkId: "link-1",
    readCount: 1000,
    tags: ["생산성", "공부", "인공지능", "AI"],
    thumbnailURL: "https://picsum.photos/374/185",
    title: "읽은 횟수 최다",
    updatedAt: "2024-03-22T15:30:00Z",
    url: "https://python.org",
    userId,
  },
  ...new Array(20)
    .fill(mockLink)
    .map((link, index) => ({ ...link, title: `${link.title}-${index + 1}` })),
].map((link, index) => ({
  ...link,
  linkBookId: `lb_00${index % mockLinkBooks.length}`,
  linkBookName: mockLinkBooks[index % mockLinkBooks.length].title,
  linkId: `link-${index + 1}`,
  userId: `user-${index + 1}`,
  thumbnailURL: `https://picsum.photos/374/${(index % 10) + 1}`,
}));
