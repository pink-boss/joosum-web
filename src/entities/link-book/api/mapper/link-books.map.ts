import type { LinkBook } from "../../model/link-book";
import type { GetLinkBooksDto } from "../dto/get-link-books.dto";

export const mapLinkBooks = (
  response: GetLinkBooksDto,
): {
  linkBooks: LinkBook[];
  totalLinkCount: number;
} => {
  return {
    linkBooks: response.linkBooks.map((linkBook) => ({
      ...linkBook,
      createdAt: new Date(linkBook.createdAt),
      lastSavedAt: new Date(linkBook.lastSavedAt),
    })),
    totalLinkCount: response.totalLinkCount,
  };
};
