import { Banner, Link } from "@/app/home/type";

export const mockLink: Link = {
  createdAt: "2024-03-21T09:00:00Z",
  lastReadAt: "2024-03-21T15:30:00Z",
  linkBookId: "book-1",
  linkBookName: "개발 문서",
  linkId: "link-1",
  readCount: 5,
  tags: ["React", "TypeScript", "Frontend", "Storybook", "TailwindCSS"],
  thumbnailURL: "https://picsum.photos/374/184",
  title:
    "React 공식 문서 - 가나다라마바사아자차카타파하 아야어요우유 테스트 자료",
  updatedAt: "2024-03-21T15:30:00Z",
  url: "https://react.dev",
  userId: "user-1",
};

export const mockLinks: Link[] = [
  {
    createdAt: "2024-03-22T09:00:00Z",
    lastReadAt: "",
    linkBookId: "book-1",
    linkBookName: "개발 문서",
    linkId: "link-1",
    readCount: 0,
    tags: ["Python", "Django", "Backend"],
    thumbnailURL: "https://picsum.photos/374/185",
    title: "Python 공식 문서",
    updatedAt: "2024-03-22T15:30:00Z",
    url: "https://python.org",
    userId: "user-1",
  },
  ...new Array(20).fill(mockLink),
].map((link, index) => ({
  ...link,
  linkBookId: `book-${index + 1}`,
  linkId: `link-${index + 1}`,
  userId: `user-${index + 1}`,
  thumbnailURL: `https://picsum.photos/374/${(index % 10) + 1}`,
}));

export const mockBanners: Banner[] = [
  {
    clickURL: "https://www.amazon.com/deals/electronics",
    id: "ad_001",
    imageURL: "https://picsum.photos/800/600?random=1",
  },
  {
    clickURL: "https://www.nike.com/running/shoes",
    id: "ad_002",
    imageURL: "https://picsum.photos/800/600?random=2",
  },
  {
    clickURL: "https://www.spotify.com/premium",
    id: "ad_003",
    imageURL: "https://picsum.photos/800/600?random=3",
  },
  {
    clickURL: "https://www.airbnb.com/rooms/experiences",
    id: "ad_004",
    imageURL: "https://picsum.photos/800/600?random=4",
  },
  {
    clickURL: "https://www.coursera.org/specializations/web-development",
    id: "ad_005",
    imageURL: "https://picsum.photos/800/600?random=5",
  },
];
