import { usePathname } from 'next/navigation';

import { useEffect } from 'react';

import { useSearchBarStore, useSearchLinkFilterStore } from '@/libs/zustand/store';

export default function useResetSearchBar() {
  const pathname = usePathname();

  const { title, setTitle } = useSearchBarStore();
  const { setFolderId } = useSearchLinkFilterStore();

  useEffect(() => {
    if (title && pathname !== '/search') {
      setTitle('');
      setFolderId('all');
    }
  }, [pathname, setTitle, setFolderId, title]);
}
