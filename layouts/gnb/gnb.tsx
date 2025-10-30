import { LinkDrawerSaveButton } from '@/components/link-drawer';
import { UserDrawerOpenButton } from '@/components/user-drawer';
import SearchInput from '@/layouts/search-input';

export default function Gnb() {
  return (
    <header
      className="mb-8 flex h-26 w-full items-center justify-between gap-6 bg-paperabovebg px-10 py-7 lg:gap-12"
      data-testid="topNavi_common"
    >
      <div className="min-w-0 flex-1">
        <SearchInput />
      </div>
      <div className="flex flex-none gap-3 lg:gap-5">
        <LinkDrawerSaveButton dataTestId="saveLink_topNavi_common" />
        <UserDrawerOpenButton dataTestId="myPage_topNavi_common" />
      </div>
    </header>
  );
}
