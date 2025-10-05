import { ApiError } from 'next/dist/server/api-utils';

import { useQuery } from '@tanstack/react-query';

import { getTagsQueryKey } from '@/libs/tanstack-query/query-key';

import { TagList } from '@/types/tags.types';

export default function useGetTagsSetting() {
  const { data, refetch, ...others } = useQuery<TagList, ApiError>({
    queryKey: getTagsQueryKey('created'),
    queryFn: () =>
      fetch(`/api/settings/tags?sort=created`, {
        method: 'GET',
      }).then((res) => res.json()),
  });

  return { ...others, data, refetch };
}
