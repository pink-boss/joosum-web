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
  ...new Array(20)
    .fill(mockLink)
    .map((link, index) => ({ ...link, title: `${link.title}-${index + 1}` })),
  {
    createdAt: "2024-08-22T09:00:00Z",
    lastReadAt: "",
    readCount: 10,
    tags: ["인공지능", "AI"],
    title: "Python 공식 문서",
    updatedAt: "2024-03-22T15:30:00Z",
    url: "https://python.org",
  },
  {
    createdAt: "2024-03-21T09:00:00Z",
    lastReadAt: "2024-03-21T15:30:00Z",
    readCount: 5,
    tags: ["생산성", "공부", "인공지능"],
    title: "React 공식 문서",
    updatedAt: "2024-03-21T15:30:00Z",
    url: "https://react.dev",
  },
  {
    createdAt: "2024-03-22T09:00:00Z",
    lastReadAt: "",
    readCount: 0,
    tags: ["생산성", "공부", "인공지능", "AI", "여행", "패션", "쇼핑"],
    title: "읽은 횟수 최저",
    updatedAt: "2024-03-22T15:30:00Z",
    url: "https://python.org",
  },
  {
    createdAt: "2024-03-24T09:00:00Z",
    lastReadAt: "",
    readCount: 1000,
    tags: ["생산성", "공부", "인공지능", "AI"],
    title: "읽은 횟수 최다",
    updatedAt: "2024-03-22T15:30:00Z",
    url: "https://python.org",
  },
].map((link, index) => ({
  ...link,
  linkBookId: `lb_00${index % mockLinkBooks.length}`,
  linkBookName: mockLinkBooks[index % mockLinkBooks.length].title,
  linkId: `link-${index + 1}`,
  userId: userId,
  thumbnailURL: `https://picsum.photos/374/${(index % 10) + 1}`,
}));

export const mockRelevanceOptionLinks: Link[] = [
  {
    createdAt: "2024-03-21T09:00:00Z",
    lastReadAt: "2024-03-21T15:30:00Z",
    readCount: 15,
    tags: ["생산성", "공부"],
    title: "React 공식 문서 (18+)",
    updatedAt: "2024-03-21T15:30:00Z",
    url: "https://react.dev",
  },
  {
    createdAt: "2024-03-21T09:00:00Z",
    lastReadAt: "2024-03-21T15:30:00Z",
    readCount: 15,
    tags: ["생산성", "공부"],
    title: "React 공식 문서 (17)",
    updatedAt: "2024-03-21T15:30:00Z",
    url: "https://legacy.reactjs.org/",
  },
  {
    createdAt: "2024-08-22T09:00:00Z",
    lastReadAt: "",
    readCount: 11,
    tags: ["디자인", "기획"],
    title: "공식 문서 - 스토리북",
    updatedAt: "2024-03-22T15:30:00Z",
    url: "https://help.figma.com/hc/en-us",
  },
  {
    createdAt: "2024-08-22T09:00:00Z",
    lastReadAt: "",
    readCount: 1,
    tags: ["디자인", "기획"],
    title: "공식 문서 - 피그마",
    updatedAt: "2024-03-22T15:30:00Z",
    url: "https://help.figma.com/hc/en-us",
  },
].map((link, index) => ({
  ...link,
  linkBookId: `lb_00${index % mockLinkBooks.length}`,
  linkBookName: mockLinkBooks[index % mockLinkBooks.length].title,
  linkId: `link-${index + 1}`,
  userId: userId,
  thumbnailURL: `https://picsum.photos/374/${(index % 10) + 1}`,
}));
