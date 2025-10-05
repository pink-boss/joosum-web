import { useGetLinks } from '@/services/link';

import { LinkFilterValues, LinkSortState } from '@/libs/zustand/schema';

interface Props {
  linkFilter: LinkFilterValues;
  linkSort: Omit<LinkSortState, 'setField'>;
}

export default function useGetAllLinks({ linkSort, linkFilter }: Props) {
  return useGetLinks({ linkSort, linkFilter, type: 'all' });
}
