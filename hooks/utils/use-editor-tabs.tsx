import { ChangeEvent, Dispatch, ReactNode, SetStateAction, useCallback } from 'react';

import FolderColorSelector from '@/components/folder-color-selector';
import FolderIllustrationSelector from '@/components/folder-illustration-selector';

import { FOLDER_BACKGROUND_COLORS, FOLDER_ILLUSTRATIONS, FOLDER_TITLE_COLORS } from '@/constants';

import { CreateFormState } from '@/types/folder.types';

const MAX_TITLE_LENGTH = 15;

type Tab = { component: ReactNode; title: string };

interface Props {
  localState: CreateFormState;
  setLocalState: Dispatch<SetStateAction<CreateFormState>>;
}

export default function useEditorTabs({ localState, setLocalState }: Props) {
  const handleStateChange = useCallback(
    (name: string, value: null | string | undefined) => {
      setLocalState((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [setLocalState],
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      handleStateChange(name, value);
    },
    [handleStateChange],
  );

  const tabs: Tab[] = [
    {
      title: '폴더명',
      component: (
        <FormItem label="폴더명">
          <input
            autoFocus
            className="rounded-lg border border-gray-200 bg-gray-200 p-3"
            maxLength={MAX_TITLE_LENGTH}
            name="title"
            placeholder="폴더명을 입력해주세요."
            value={localState.title}
            onChange={handleInputChange}
          />
          <div className="ml-auto mt-1.5 text-gray-500">
            {localState.title?.length ?? 0}/{MAX_TITLE_LENGTH}
          </div>
        </FormItem>
      ),
    },
    {
      title: '색상',
      component: (
        <>
          <FormItem label="배경">
            <div className="flex flex-wrap gap-2">
              {FOLDER_BACKGROUND_COLORS.map((color, index) => (
                <FolderColorSelector
                  key={color}
                  color={color}
                  colorIndex={index}
                  previewColor={localState.backgroundColor}
                  setPreviewColor={handleStateChange}
                  stateName="backgroundColor"
                />
              ))}
            </div>
          </FormItem>
          <FormItem label="제목">
            <div className="flex flex-wrap gap-2">
              {FOLDER_TITLE_COLORS.map((color, index) => (
                <FolderColorSelector
                  key={color}
                  color={color}
                  colorIndex={index}
                  previewColor={localState.titleColor}
                  setPreviewColor={handleStateChange}
                  stateName="titleColor"
                />
              ))}
            </div>
          </FormItem>
        </>
      ),
    },
    {
      title: '일러스트',
      component: (
        <FormItem label="일러스트">
          <div className="flex flex-wrap gap-2">
            {FOLDER_ILLUSTRATIONS.map((illustration, index) => (
              <FolderIllustrationSelector
                key={illustration}
                illustration={illustration}
                illustrationIndex={index}
                previewIllustration={localState.illustration}
                setPreviewIllustration={handleStateChange}
                stateName="illustration"
              />
            ))}
          </div>
        </FormItem>
      ),
    },
  ];

  return tabs;
}

type FormItemInputProps = {
  children: ReactNode;
  label: string;
};

function FormItem({ children, label }: FormItemInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="px-1 font-semibold text-gray-900">{label}</label>
      {children}
    </div>
  );
}
