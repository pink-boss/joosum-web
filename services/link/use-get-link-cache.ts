import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useGetFolderFromTitle } from '@/services/folder';

import { getLinkListQueryKey } from '@/libs/tanstack-query/query-key';

import { Link } from '@/types/link.types';

interface Props {
  currentLinkId?: string;
}

// TODO: console.log 제거
export default function useGetLinkCache({ currentLinkId }: Props) {
  const queryClient = useQueryClient();

  const folder = useGetFolderFromTitle();
  console.log('folder', folder);
  const queryKey = getLinkListQueryKey(folder?.linkBookId);

  const { data } = useQuery<Link | undefined>({
    queryKey: ['link', 'current'],
    enabled: !!currentLinkId,
    queryFn: () => {
      const linkList = queryClient.getQueryData<Link[]>(queryKey) ?? [];
      console.log('linkList', linkList);
      return linkList.find((link) => link.linkId === currentLinkId);
    },
    staleTime: Infinity,
  });

  return data;
}
