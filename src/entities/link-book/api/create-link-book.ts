import { HttpMethod, fetcher } from "@/shared/lib/fetcher";
import type { CreateLinkBookDto } from "./dto/create-link-book.dto";

export const createLinkBook = (dto: CreateLinkBookDto) =>
  fetcher.fetch(HttpMethod.POST, "/link-books", {
    body: dto,
  });
