import Link from 'next/link';

import { ReactNode } from 'react';

import { isFolderLink } from '@/utils/folder-link';
import { encodeForUrlPath } from '@/utils/url-encoder';

import { EntireFolderProps, Folder } from '@/types/folder.types';

interface Props {
  children: ReactNode;
  dataTestId?: string;
  folder: EntireFolderProps | Folder;
}

export default function FolderLink({ children, folder, dataTestId }: Props) {
  let path = '/link-book';
  if (isFolderLink(folder) && folder.linkBookId) {
    path += `/${encodeForUrlPath(folder.title)}`;
  }

  return (
    <Link data-testid={dataTestId} href={path}>
      {children}
    </Link>
  );
}
