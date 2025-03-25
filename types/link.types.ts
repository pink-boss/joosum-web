export interface Link {
  createdAt: string;
  lastReadAt: string;
  linkBookId: string;
  linkBookName: string;
  linkId: string;
  readCount: number;
  tags: string[];
  thumbnailURL: string;
  title: string;
  updatedAt: string;
  url: string;
  userId: string;
}

export type MutateLink = Pick<
  Link,
  | "linkId"
  | "linkBookId"
  | "linkBookName"
  | "tags"
  | "thumbnailURL"
  | "title"
  | "url"
>;

export type CreateFormState = Partial<Omit<MutateLink, "tags">> &
  Pick<MutateLink, "tags">;

export type UpdateFormState = MutateLink;

export type SaveLink = Pick<
  Link,
  "linkBookId" | "tags" | "thumbnailURL" | "title" | "url"
>;
