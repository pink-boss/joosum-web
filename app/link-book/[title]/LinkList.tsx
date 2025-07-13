import LinkListComponent from "@/components/link/link-list/LinkList";
import useQueryLinkBookLinks from "@/hooks/link/useQueryLinkBookLinks";
import { LinkFilterValues } from "@/store/link-filter/schema";
import { useFolderLinkSortStore } from "@/store/link-sort/useFolderStore";
import { LinkBook } from "@/types/linkBook.types";

type InputProps = {
  defaultEditMode?: boolean;
  linkFilter: LinkFilterValues;
  linkBookId?: LinkBook["linkBookId"];
};

export default function LinkList({
  defaultEditMode = false,
  linkFilter,
  linkBookId,
}: InputProps) {
  const linkSort = useFolderLinkSortStore();
  const links = useQueryLinkBookLinks({
    linkSort,
    linkFilter,
    linkBookId,
  });
  return (
    <LinkListComponent
      defaultEditMode={defaultEditMode}
      linkSort={linkSort}
      linkFilter={linkFilter}
      linkBookId={linkBookId}
      queryResult={links}
    />
  );
}
