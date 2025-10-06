'use client';

import { useCallback, useMemo, useState } from 'react';

import clsx from 'clsx';

import { useGetFolders } from '@/services/folder';

import { useClickAway } from '@/hooks/utils';

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
  const { open, folderId, setFolderId, fromFolderId, className, disabled, onClickCallback, dataTestId } = props;

  const { data } = useGetFolders('created_at');

  const ref = useClickAway({ onClose: () => setIsOpen(false) });
  const [isOpen, setIsOpen] = useState(open);

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

  const handleClick = useCallback(
    (newLinkBookName: Folder['title'], newLinkBookId: Folder['linkBookId']) => {
      setFolderId(newLinkBookName, newLinkBookId);
      setIsOpen(false);
    },
    [setFolderId, setIsOpen],
  );

  return (
    <div ref={ref} className="relative">
      <button
        data-testid={dataTestId}
        disabled={disabled}
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          onClickCallback?.();
        }}
        className={clsx(
          'flex items-center justify-between gap-0.5 px-3 text-start text-sm text-gray-700',
          'h-[46px] w-full rounded-lg border border-gray-500',
          className && className,
        )}
      >
        <span className="text-single-line w-64">{folderOptions?.find(({ value }) => value === folderId)?.label}</span>
        <ChevronDownIcon aria-hidden="true" className="size-6 text-gray-500" />
      </button>
      {isOpen && (
        <div
          className={clsx(
            'absolute z-10 mt-1 max-h-[214px] w-full overflow-y-auto',
            'rounded-lg border border-gray-200 bg-white p-6 shadow-lg',
          )}
        >
          <div className="mini-scroll h-full">
            <div className="flex flex-col gap-2 p-3">
              {folderOptions?.map(({ label, value }) => (
                <button
                  key={`reassign-to-${label}`}
                  className="text-single-line h-6 text-start"
                  type="button"
                  onClick={() => handleClick(label, value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
