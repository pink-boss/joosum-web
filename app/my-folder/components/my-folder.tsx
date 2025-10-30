import Folder from '@/components/folder';
import FolderLink from '@/components/folder-link';
import FolderMutateDropdown from '@/components/folder-mutate-dropdown';

import { isFolderLink } from '@/utils/folder-link';

import { Folder as FolderType } from '@/types/folder.types';

interface Props {
  folder: FolderType;
}

export default function MyFolder({ folder }: Props) {
  return (
    <FolderLink dataTestId="folderList_myFolder" folder={folder}>
      <div className="flex h-[275.9px] w-[174.9px] flex-col items-center gap-[17.6px]">
        <Folder {...folder}>
          {isFolderLink(folder) && folder.isDefault !== 'y' && (
            <div className="absolute bottom-[13.3px] right-[14.21px] p-px" onClick={(e) => e.stopPropagation()}>
              <FolderMutateDropdown dataTestId="setting_myFolder" folder={folder} type="myFolder" />
            </div>
          )}
        </Folder>
        <span className="text-16-24 font-normal tracking-[-0.2px] text-gray-700">{folder.linkCount}개</span>
      </div>
    </FolderLink>
  );
}
