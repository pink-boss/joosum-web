'use client';

import { useCallback, useMemo, useState } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { useGetFolders } from '@/services/folder';

import { clsx } from '@/utils/clsx';

import { ChevronDownIcon } from '@/assets/icons';

import { Folder } from '@/types/folder.types';

interface Props {
  className?: string;
  disabled?: boolean;
  fromFolderId?: string;
  folderId?: Folder['linkBookId'];
  onClickCallback?: () => void;
  open?: boolean;
  dataTestId?: string;
  setFolderId: (folderName: Folder['title'], folderId: Folder['linkBookId']) => void;
}

// 폴더 선택 드롭다운
export default function FolderDropdown(props: Props) {
  const { folderId, setFolderId, fromFolderId, className, disabled, onClickCallback, dataTestId } = props;

  const { data } = useGetFolders({ sort: 'created_at' });

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = useCallback(
    (newLinkBookName: Folder['title'], newLinkBookId: Folder['linkBookId']) => {
      setFolderId(newLinkBookName, newLinkBookId);
    },
    [setFolderId],
  );

  const folderOptions: OptionItem[] = useMemo(() => {
    const folders = fromFolderId
      ? data?.linkBooks?.filter((folder) => folder.linkBookId !== fromFolderId)
      : data?.linkBooks;

    return folders
      ? folders.map((folder) => ({
          label: folder.title,
          value: folder.linkBookId,
        }))
      : [];
  }, [data?.linkBooks, fromFolderId]);

  const selectedFolder = useMemo(
    () => folderOptions?.find(({ value }) => value === folderId)?.label,
    [folderOptions, folderId],
  );

  return (
    <DropdownMenu.Root modal={true} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          data-testid={dataTestId}
          disabled={disabled}
          type="button"
          onClick={onClickCallback}
          className={clsx(
            'flex h-11.5 w-full items-center justify-between gap-0.5 rounded-lg border border-gray-200 bg-gray-200 px-3 text-gray-700',
            isOpen && 'border-primary-500 bg-primary-100 text-gray-900',
            selectedFolder && 'text-gray-900',
            className && className,
          )}
        >
          <span className="line-clamp-1 w-64 text-start text-16-24 font-normal tracking-[-0.2px] text-inherit">
            {selectedFolder || ''}
          </span>
          <ChevronDownIcon
            aria-hidden="true"
            className={clsx('size-6 text-gray-500 transition-transform duration-200', isOpen && 'rotate-180')}
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          className="mini-scroll max-h-53.5 overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 shadow-2-16-19-0"
          sideOffset={4}
          style={{ zIndex: 9999, width: 'var(--radix-dropdown-menu-trigger-width)' }}
        >
          <div className="flex flex-col gap-2">
            {folderOptions?.map(({ label, value }) => (
              <DropdownMenu.Item
                key={`reassign-to-${label}`}
                className="h-6"
                onSelect={() => handleSelect(label, value)}
              >
                <span className="line-clamp-1 text-start text-16-24 font-normal tracking-[-0.2px] text-black">
                  {label}
                </span>
              </DropdownMenu.Item>
            ))}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
