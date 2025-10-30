import { useCallback, useMemo } from 'react';

import { useGetFolders } from '@/services/folder';

import { useSearchLinkFilterStore, useSearchLinkSortStore } from '@/libs/zustand/store';
import { clsx } from '@/utils/clsx';

export default function SearchTab() {
  const linkSort = useSearchLinkSortStore();
  const { folderId: selected, setFolderId: setSelected } = useSearchLinkFilterStore();

  const { data } = useGetFolders({ sort: linkSort.sort });

  const handleClick = useCallback(
    (folderId: string) => {
      setSelected(folderId);
    },
    [setSelected],
  );

  const folders = useMemo(() => data?.linkBooks ?? [], [data?.linkBooks]);

  return (
    <div className="scrollbar-hide flex gap-3 overflow-x-auto">
      <Tab isSelected={!!selected === false} title="전체" onClick={() => handleClick('')} />
      {folders.map((folder) => (
        <Tab
          key={folder.linkBookId}
          isSelected={selected === folder.linkBookId}
          title={folder.title}
          onClick={() => handleClick(folder.linkBookId)}
        />
      ))}
    </div>
  );
}

function Tab({ isSelected, title, onClick }: { isSelected: boolean; onClick: () => void; title: string }) {
  return (
    <button
      data-testid="tab_searchResult"
      type="button"
      onClick={onClick}
      className={clsx(
        'h-9 flex-none whitespace-nowrap rounded-md px-4 py-1.5 font-semibold',
        isSelected && 'bg-primary-400 text-white hover:bg-primary-500',
        !isSelected && 'bg-gray-300 text-gray-600 hover:bg-gray-200',
      )}
    >
      {title}
    </button>
  );
}
