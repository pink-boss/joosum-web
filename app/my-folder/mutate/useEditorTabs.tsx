import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { CreateFormState } from "../type";
import {
  pickBackgroundColors,
  pickIllustrations,
  pickTitleColors,
} from "./data";
import ColorBox from "./color-box";
import IllustrationBox from "./illustration-box";

type FormItemInputProps = {
  children: ReactNode;
  label: string;
};

function FormItem({ children, label }: FormItemInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="px-1 font-semibold text-[#1D1D1D]">{label}</label>
      {children}
    </div>
  );
}

type Tab = { title: string; component: ReactNode };

export default function useEditorTabs(
  localState: CreateFormState,
  setLocalState: Dispatch<SetStateAction<CreateFormState>>,
) {
  const handleStateChange = (
    name: string,
    value: string | undefined | null,
  ) => {
    setLocalState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleStateChange(name, value);
  };

  const tabs: Tab[] = [
    {
      title: "폴더명",
      component: (
        <FormItem label="링크북명">
          <input
            data-testid="linkbook-title"
            name="title"
            placeholder="폴더명을 입력해주세요."
            className="rounded-lg border border-background-secondary bg-background-secondary p-3"
            onChange={handleInputChange}
            value={localState.title}
            autoFocus
            maxLength={15}
          />
        </FormItem>
      ),
    },
    {
      title: "색상",
      component: (
        <>
          <FormItem label="배경">
            <div className="flex flex-wrap gap-2">
              {pickBackgroundColors.map((color, index) => (
                <ColorBox
                  key={color}
                  color={color}
                  previewColor={localState.backgroundColor}
                  setPreviewColor={handleStateChange}
                  stateName="backgroundColor"
                  colorIndex={index}
                />
              ))}
            </div>
          </FormItem>
          <FormItem label="제목">
            <div className="flex flex-wrap gap-2">
              {pickTitleColors.map((color, index) => (
                <ColorBox
                  key={color}
                  color={color}
                  previewColor={localState.titleColor}
                  setPreviewColor={handleStateChange}
                  stateName="titleColor"
                  colorIndex={index}
                />
              ))}
            </div>
          </FormItem>
        </>
      ),
    },
    {
      title: "일러스트",
      component: (
        <FormItem label="일러스트">
          <div className="flex flex-wrap gap-2">
            {pickIllustrations.map((illustration, index) => (
              <IllustrationBox
                key={illustration}
                illustration={illustration}
                previewIllustration={localState.illustration}
                setPreviewIllustration={handleStateChange}
                stateName="illustration"
                illustrationIndex={index}
              />
            ))}
          </div>
        </FormItem>
      ),
    },
  ];

  return tabs;
}
