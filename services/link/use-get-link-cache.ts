import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useGetFolderFromTitle } from '@/services/folder';

import { getLinkListQueryKey } from '@/libs/tanstack-query/query-key';

import { Link } from '@/types/link.types';

export default function useGetLinkCache(currentLinkId?: string) {
  const queryClient = useQueryClient();

  const folder = useGetFolderFromTitle();
  const queryKey = getLinkListQueryKey(folder?.linkBookId);

  const { data } = useQuery<Link | undefined>({
    queryKey: ['link', 'current'],
    enabled: !!currentLinkId,
    queryFn: () => {
      const linkList = queryClient.getQueryData<Link[]>(queryKey) ?? [];
      return linkList.find((link) => link.linkId === currentLinkId);
    },
    staleTime: Infinity,
  });

  return data;
}
