import { useParams } from 'next/navigation';

import { useGetFolders } from '@/services/folder';

import { decodeFromUrlPath } from '@/utils/url-encoder';

export default function useGetFolderFromTitle() {
  const { title } = useParams<{ title: string }>();

  const { data } = useGetFolders('created_at');

  if (!title) return undefined;

  return data?.linkBooks?.find((folder) => folder.title === decodeFromUrlPath(title));
}
