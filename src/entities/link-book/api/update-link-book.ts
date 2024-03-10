import { HttpMethod, fetcher } from "@/shared/lib/fetcher";
import type { GetLinkBooksDto } from "./dto/get-link-books.dto";
import type { UpdateLinkBookDto } from "./dto/update-link-book.dto";

export const updateLinkBook = (id: string, dto: UpdateLinkBookDto) => {
  return fetcher.fetch<GetLinkBooksDto>(HttpMethod.PUT, `/link-books/${id}`, {
    body: dto,
  });
};
