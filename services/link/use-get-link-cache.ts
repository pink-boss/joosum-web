import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useGetFolderFromTitle } from '@/services/folder';

import { getLinkListQueryKey } from '@/libs/tanstack-query/query-key';

import { Link } from '@/types/link.types';

interface Props {
  currentLinkId?: string;
}

export default function useGetLinkCache({ currentLinkId }: Props) {
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
