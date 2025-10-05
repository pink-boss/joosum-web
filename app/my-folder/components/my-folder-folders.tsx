import { Folder } from '@/types/folder.types';

import MyFolder from './my-folder';

interface Props {
  folders: Folder[];
  totalLinkCount: number;
}

export default function MyFolderFolders({ folders, totalLinkCount }: Props) {
  return (
    <div className="flex flex-1 flex-wrap content-start gap-x-6 gap-y-8 overflow-auto">
      <MyFolder
        folder={{
          backgroundColor: '#6D6D6F',
          linkCount: totalLinkCount,
          title: '전체',
          titleColor: '#FFFFFF',
          isDefault: 'y',
          createdAt: '',
          illustration: null,
          lastSavedAt: '',
          userId: '',
          linkBookId: '',
        }}
      />
      {folders?.map((folder) => (
        <MyFolder key={folder.linkBookId} folder={folder} />
      ))}
    </div>
  );
}
