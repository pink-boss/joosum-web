import { HttpMethod, fetcher } from "@/shared/lib/fetcher";
import { mapLinkBooks } from "@/entities/link-book/api/mapper/link-books.map";
import type { GetLinkBooksDto } from "./dto/get-link-books.dto";

export const getLinkBooks = (query: {
  sort: "created_at" | "last_saved_at" | "title";
}) =>
  fetcher
    .fetch<GetLinkBooksDto>(HttpMethod.GET, "/api/link-books", {
      query,
    })
    .then(mapLinkBooks);
