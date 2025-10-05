import clsx from 'clsx';

import { LinkDrawerSaveButton } from '@/components/link-drawer';
import { UserDrawerOpenButton } from '@/components/user-drawer';
import SearchInput from '@/layouts/search-input';

import { useResetSearchBar } from '@/hooks/zustand';

export default function Gnb() {
  // '/search' 페이지가 아니면 검색어 초기화
  useResetSearchBar();

  return (
    <header
      data-testid="topNavi_common"
      className={clsx(
        'mb-8 flex h-[104px] w-full items-center justify-between bg-paperabovebg py-7',
        'gap-6 px-10',
        'lg:gap-12',
      )}
    >
      <div className="min-w-0 flex-1">
        <SearchInput />
      </div>
      <div className={clsx('flex flex-none', 'gap-3', 'sm:gap-4', 'lg:gap-[20px]')}>
        <LinkDrawerSaveButton dataTestId="saveLink_topNavi_common" />
        <UserDrawerOpenButton dataTestId="myPage_topNavi_common" />
      </div>
    </header>
  );
}
