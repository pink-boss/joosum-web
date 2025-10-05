import { EntireFolderProps, Folder } from '@/types/folder.types';

export const isFolderLink = (folder: EntireFolderProps | Folder): folder is Folder => {
  return 'linkBookId' in folder && Boolean(folder.linkBookId);
};
