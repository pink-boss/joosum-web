import { useParams } from "next/navigation";

import { replaceDashWithSpaces } from "@/utils/urlEncoder";

import useQueryLinkBooks from "../my-folder/useQueryLinkBooks";

export default function useLinkBookFromTitle() {
  const { title } = useParams<{ title: string }>();

  const { data } = useQueryLinkBooks("created_at");

  if (!title) return undefined;

  return data?.linkBooks.find(
    (linkBook) => linkBook.title === replaceDashWithSpaces(title),
  );
}
