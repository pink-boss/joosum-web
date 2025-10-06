import Link from 'next/link';

import { MouseEvent, useCallback } from 'react';

import clsx from 'clsx';

import { useGetFolders, useSelectFolder } from '@/services/folder';

import FolderLink from '@/components/folder-link';
import FolderMutateDropdown from '@/components/folder-mutate-dropdown';
import Loader from '@/components/loader';

import { useDialogStore, useLayoutStore } from '@/libs/zustand/store';

import { ChevronDownIcon, FolderIcon, HomeIcon, PlusIcon } from '@/assets/icons';

import { Folder } from '@/types/folder.types';

// LNB > 메뉴
export default function Menu() {
  const { openSideMenu, setOpenSideMenu } = useLayoutStore();
  const { openMutateFolder } = useDialogStore();

  const { isPending, data } = useGetFolders({ sort: 'created_at' });

  const { clearFolder } = useSelectFolder({});

  const handleClose = useCallback(() => {
    openMutateFolder(false);
  }, [openMutateFolder]);

  const handleOpen = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      setOpenSideMenu(!openSideMenu);
    },
    [openSideMenu, setOpenSideMenu],
  );

  const handleCreate = useCallback(() => {
    clearFolder();
    openMutateFolder(true);
  }, [clearFolder, openMutateFolder]);

  return (
    <div className="w-70.5">
      {/* 홈 */}
      <Link data-testid="home_gnb_common" href="/dashboard" onClick={handleClose}>
        <div className="flex items-center gap-4 px-10 py-3">
          <HomeIcon aria-hidden="true" className="size-6 shrink-0 text-gray-700" />
          <span className="text-lg font-bold text-gray-800">홈</span>
        </div>
      </Link>
      {/* 내 폴더 */}
      <Link data-testid="myFolder_gnb_common" href="/my-folder">
        <div className="flex cursor-pointer items-center gap-4 px-10 py-3">
          <FolderIcon aria-hidden="true" className="size-6 shrink-0 text-gray-500" />
          <span className="text-lg font-bold text-gray-800">내 폴더</span>
          <button className="ml-auto" type="button" onClick={handleOpen}>
            <ChevronDownIcon
              aria-hidden="true"
              className={clsx('size-6 text-gray-600 transition-transform duration-300', !openSideMenu && 'rotate-180')}
            />
          </button>
        </div>
      </Link>
      {isPending && openSideMenu ? (
        <Loader />
      ) : (
        <div
          className={clsx(
            openSideMenu ? 'mini-scroll max-h-[50vh] overflow-y-auto overflow-x-hidden' : 'h-0 overflow-hidden',
          )}
        >
          {/* 폴더 > 전체 */}
          <Link data-testid="folder_gnb_common" href="/link-book">
            <div className={clsx('h-12 py-3 pl-12 pr-5', 'flex items-center gap-2')}>
              <div
                className={clsx('size-5 rounded-full border border-white')}
                style={{
                  backgroundColor: data?.linkBooks?.[0]?.backgroundColor,
                }}
              />
              <div className="w-36 truncate font-semibold text-gray-graphite">전체</div>
            </div>
          </Link>
          {/* 폴더 > 유저가 생성한 폴더 */}
          {data?.linkBooks?.map((folder, index) => (
            <MenuItem key={index} folder={folder} />
          ))}
        </div>
      )}
      {/* 폴더 만들기 */}
      <button
        className="flex w-full cursor-pointer items-center justify-center gap-1 bg-white py-3"
        data-testid="addFolder_gnb_common"
        type="button"
        onClick={handleCreate}
      >
        <PlusIcon aria-hidden="true" className="size-7 text-gray-500" />
        <span className="text-left font-semibold text-gray-graphite">폴더 만들기</span>
      </button>
    </div>
  );
}

function MenuItem({ folder }: { folder: Folder }) {
  return (
    <FolderLink data-testid="folder_gnb_common" folder={folder}>
      <div className={clsx('h-12 py-3 pl-12 pr-5')}>
        <div className="relative flex items-center gap-2">
          <div
            className={clsx('size-5 rounded-full border border-white')}
            style={{ backgroundColor: folder.backgroundColor }}
          />
          <div className="w-36 truncate font-semibold text-gray-graphite">{folder.title}</div>
          {/* 폴더 수정/삭제 드롭다운 */}
          {folder.isDefault !== 'y' && (
            <div className="absolute right-0" onClick={(e) => e.stopPropagation()}>
              <FolderMutateDropdown isLayout folder={folder} type="menu" />
            </div>
          )}
        </div>
      </div>
    </FolderLink>
  );
}
