import { useQuery } from '@tanstack/react-query';

import { getTagsQueryKey } from '@/libs/tanstack-query/query-key';

export default function useGetLinkFilterTags() {
  const {
    isPending,
    error,
    data: totalTags = [],
  } = useQuery<string[]>({
    queryKey: getTagsQueryKey('used'),
    queryFn: () =>
      fetch(`/api/settings/tags?sort=used`, {
        method: 'GET',
      }).then((res) => res.json()),
    staleTime: 60 * 60 * 1000,
  });

  return { isPending, error, totalTags };
}
