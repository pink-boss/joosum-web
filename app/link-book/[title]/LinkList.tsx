import LinkListComponent from "@/components/link/link-list/LinkList";
import { LinkFilterValues } from "@/store/link-filter/schema";
import { LinkSortState } from "@/store/link-sort/schema";
import { LinkBook } from "@/types/linkBook.types";

type InputProps = {
  defaultEditMode?: boolean;
  linkSort: LinkSortState;
  linkFilter: LinkFilterValues;
  linkBookId?: LinkBook["linkBookId"];
};

export default function LinkList({
  defaultEditMode = false,
  linkSort,
  linkFilter,
  linkBookId,
}: InputProps) {
  return (
    <LinkListComponent
      type="linkBook"
      defaultEditMode={defaultEditMode}
      linkSort={linkSort}
      linkFilter={linkFilter}
      linkBookId={linkBookId}
    />
  );
}
