import LinkListComponent from "@/components/link/link-list/LinkList";
import useQuerySearchLinks from "@/hooks/link/useQuerySearchLinks";
import { LinkFilterValues } from "@/store/link-filter/schema";
import { useSearchLinkFilterStore } from "@/store/link-filter/useSearchStore";
import { useSearchLinkSortStore } from "@/store/link-sort/useSearchStore";

type InputProps = {
  defaultEditMode?: boolean;
  linkFilter: LinkFilterValues;
};

export default function LinkList({
  defaultEditMode = false,
  linkFilter,
}: InputProps) {
  const linkSort = useSearchLinkSortStore();
  const { linkBookId } = useSearchLinkFilterStore();
  console.log("searchlinkBookId", linkBookId);
  const links = useQuerySearchLinks({
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
