'use client';

import { useGetFolders } from '@/services/folder';

import Dropdown from '@/components/dropdown';
import Loader from '@/components/loader';

import { FOLDER_SORT_OPTIONS } from '@/constants';
import { FolderSort, useFolderSortStore } from '@/libs/zustand/store';

import { MyFolderCreateButton, MyFolderFolders } from './components';

// 내 폴더 클릭 시 노출되는 화면
export default function MyFolder() {
  const { sort, setSort } = useFolderSortStore();

  const { isPending, data } = useGetFolders({ sort });

  return (
    <div className="flex w-full flex-1 flex-col gap-8 overflow-hidden px-10 pb-8">
      <div className="flex items-center justify-end gap-3">
        <Dropdown
          dataTestId="sortby_myFolder"
          options={FOLDER_SORT_OPTIONS}
          selected={sort}
          setSelected={(option) => setSort(option as FolderSort)}
        />
        <MyFolderCreateButton />
      </div>
      {isPending ? (
        <Loader />
      ) : (
        <MyFolderFolders folders={data?.linkBooks ?? []} totalLinkCount={data?.totalLinkCount ?? 0} />
      )}
    </div>
  );
}
