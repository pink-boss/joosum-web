import { Dispatch, SetStateAction, useState } from 'react';

import Folder from '@/components/folder';

import { useEditorTabs } from '@/hooks/utils';
import { clsx } from '@/utils/clsx';

import { CreateFormState } from '@/types/folder.types';

interface Props extends CreateFormState {
  setFormState: Dispatch<SetStateAction<CreateFormState>>;
}

export default function FolderMutateDialogEditor({ setFormState, ...formState }: Props) {
  const tabs = useEditorTabs({ localState: formState, setLocalState: setFormState });

  const [selectedTab, setSelectedTab] = useState(tabs[0].title);

  return (
    <div className="mb-5 flex w-full flex-col items-center">
      <div className="flex min-h-64 w-full flex-1 items-center justify-center bg-gray-300">
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
                  'min-w-17 px-2 py-1',
                  isSelected ? 'border-b-2 border-primary-500 font-bold text-primary-500' : 'font-normal text-gray-600',
                )}
                data-testid={
                  tab.title === '폴더명'
                    ? 'folderTitle_addFolder'
                    : tab.title === '색상'
                      ? 'folderColor_addFolder'
                      : 'folderIllust_addFolder'
                }
              >
                <span className="text-18-26 tracking-[-0.2px] text-inherit">{tab.title}</span>
              </button>
            );
          })}
        </div>
        {tabs.find(({ title }) => selectedTab === title)?.component}
      </div>
    </div>
  );
}
