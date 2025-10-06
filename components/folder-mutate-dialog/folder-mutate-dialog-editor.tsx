import { Dispatch, SetStateAction, useState } from 'react';

import clsx from 'clsx';

import Folder from '@/components/folder';

import { useEditorTabs } from '@/hooks/utils';

import { CreateFormState } from '@/types/folder.types';

interface Props extends CreateFormState {
  setFormState: Dispatch<SetStateAction<CreateFormState>>;
}

export default function FolderMutateDialogEditor({ setFormState, ...formState }: Props) {
  const tabs = useEditorTabs({ localState: formState, setLocalState: setFormState });

  const [selectedTab, setSelectedTab] = useState(tabs[0].title);

  return (
    <div className="mb-5 flex w-full flex-col items-center">
      <div className={clsx('min-h-64 w-full flex-1 bg-gray-300', 'flex items-center justify-center')}>
        <Folder isPreview {...formState} />
      </div>
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full gap-2 py-2 text-center">
          {tabs.map((tab) => {
            const isSelected = tab.title === selectedTab;
            return (
              <button
                key={tab.title}
                type="button"
                onClick={() => setSelectedTab(tab.title)}
                className={clsx(
                  'min-w-17 cursor-pointer px-2 py-1 text-lg',
                  isSelected ? 'border-b-2 border-primary-500 font-bold text-primary-500' : 'text-gray-600',
                )}
                data-testid={
                  tab.title === '폴더명'
                    ? 'folderTitle_addFolder'
                    : tab.title === '색상'
                      ? 'folderColor_addFolder'
                      : 'folderIllust_addFolder'
                }
              >
                {tab.title}
              </button>
            );
          })}
        </div>
        {tabs.find(({ title }) => selectedTab === title)?.component}
      </div>
    </div>
  );
}
