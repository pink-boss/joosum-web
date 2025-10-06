'use client';

import { useGetFolderFromTitle } from '@/services/folder';

import LinkFilter from '@/components/link-filter';
import Loader from '@/components/loader';

import { LINK_FILTER_DEFAULT_VALUES } from '@/libs/zustand/schema';
import { useFolderLinkFilterStore, useSearchBarStore } from '@/libs/zustand/store';

import { LinkBookLinkList } from './components';

// LNB에 있는 내 폴더 > 하위 폴더 클릭시 노출되는 화면
export default function LinkBookDetail() {
  const linkFilter = useFolderLinkFilterStore();
  const { title } = useSearchBarStore();

  const folder = useGetFolderFromTitle();

  return !title ? (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-[25px] px-10 pb-8">
      <div className="text-[32px] font-extrabold leading-10 text-gray-800">{folder ? folder.title : '전체'}</div>
      <LinkFilter
        {...linkFilter}
        dateDataTestId="dateFilter_linkList"
        defaultValues={LINK_FILTER_DEFAULT_VALUES}
        unreadDataTestId="unreadFilter_linkList"
      />
      <LinkBookLinkList folderId={folder?.linkBookId} linkFilter={linkFilter} />
    </div>
  ) : (
    <Loader />
  );
}
