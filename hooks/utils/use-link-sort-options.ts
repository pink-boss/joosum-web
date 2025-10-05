import { usePathname } from 'next/navigation';

import { LINK_BOOK_SORT_OPTIONS } from '@/constants';

export default function useLinkSortOptions() {
  const pathname = usePathname();

  const relevanceOption = { label: '관련도순', value: 'relevance' };

  return pathname.startsWith('/search') ? [relevanceOption, ...LINK_BOOK_SORT_OPTIONS] : LINK_BOOK_SORT_OPTIONS;
}
