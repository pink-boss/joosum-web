import { Link } from "@/types/link.types";

import { useCheckLinkStore } from "@/store/useCheckLinkStore";

export default function useCheckLink() {
  const { links, setLinks, clearLinks } = useCheckLinkStore();

  const setCachedLink = (linkId: string) => {
    if (links.has(linkId)) {
      links.delete(linkId);
    } else {
      links.add(linkId);
    }
    setLinks([...links]);
  };

  const setAllLinks = (isAllChecked: boolean, allLinks: Link[]) => {
    if (isAllChecked) {
      setLinks(allLinks?.map((link) => link.linkId));
    } else {
      clearLinks();
    }
  };

  return { cachedLinks: links, setCachedLink, setAllLinks, clearLinks };
}
