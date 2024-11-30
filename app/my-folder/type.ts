export interface LinkBook {
  backgroundColor: string;
  createdAt: string;
  illustration: string;
  isDefault: string;
  lastSavedAt: string;
  linkBookId: string;
  linkCount: number;
  title: string;
  titleColor: string;
  userId: string;
}

export interface LinkBooksResponse {
  linkBooks: LinkBook[];
  totalLinkCount: number;
}

export type CreateLinkBook = Pick<
  LinkBook,
  "backgroundColor" | "illustration" | "title" | "titleColor"
>;

export type CreateFormState = Partial<CreateLinkBook>;
