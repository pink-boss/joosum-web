import { HttpMethod, fetcher } from "@/shared/lib/fetcher";
import type { GetLinkBooksDto } from "./dto/get-link-books.dto";

export const deleteLinkBook = (id: string) => {
  return fetcher.fetch<GetLinkBooksDto>(HttpMethod.DELETE, `/link-books/${id}`);
};
