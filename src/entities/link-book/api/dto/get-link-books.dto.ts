export interface GetLinkBooksDto {
  linkBooks: {
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
  }[];
  totalLinkCount: number;
}
