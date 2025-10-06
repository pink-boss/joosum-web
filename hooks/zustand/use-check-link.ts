import { useCallback } from 'react';

import { useCheckLinkStore } from '@/libs/zustand/store';

import { Link } from '@/types/link.types';

export default function useCheckLink() {
  const { links, setLinks, clearLinks } = useCheckLinkStore();

  const setCachedLink = useCallback(
    (linkId: string) => {
      if (links.has(linkId)) {
        links.delete(linkId);
      } else {
        links.add(linkId);
      }
      setLinks([...links]);
    },
    [links, setLinks],
  );

  const setAllLinks = useCallback(
    (isAllChecked: boolean, allLinks?: Link[]) => {
      if (isAllChecked) {
        setLinks(allLinks?.map((link) => link.linkId));
      } else {
        clearLinks();
      }
    },
    [clearLinks, setLinks],
  );

  return { cachedLinks: links, setCachedLink, setAllLinks, clearLinks };
}
