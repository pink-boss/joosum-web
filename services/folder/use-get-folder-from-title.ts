import { useParams } from 'next/navigation';

import { useGetFolders } from '@/services/folder';

import { decodeFromUrlPath } from '@/utils/url-encoder';

export default function useGetFolderFromTitle() {
  const { title } = useParams<{ title: string }>();
  console.log('title', title);

  const { data } = useGetFolders('created_at');
  console.log('data', data);
  console.log('data?.linkBooks', data?.linkBooks);
  console.log('title', decodeFromUrlPath(title));

  if (!title) return undefined;

  return data?.linkBooks?.find((folder) => folder.title === decodeFromUrlPath(title));
}
