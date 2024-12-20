import clsx from "clsx";
import { FolderBook } from "../folder";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import useEditorTabs from "@/hooks/useEditorTabs";
import { CreateFormState } from "@/types/linkBook.types";

type Tab = { title: string; component: ReactNode };

type EditorTabInputProps = {
  tab: Tab;
  selectedTab: string;
  setSelectedTab: (title: string) => void;
};

function EditorTab({ tab, selectedTab, setSelectedTab }: EditorTabInputProps) {
  const isSelected = tab.title === selectedTab;
  return (
    <div
      key={tab.title}
      className={clsx(
        "min-w-[68px] cursor-pointer px-2 py-1 text-lg",
        isSelected
          ? "border-primary-500 text-primary-500 border-b-[2px] font-bold"
          : "text-gray-slate",
      )}
      onClick={() => setSelectedTab(tab.title)}
    >
      {tab.title}
    </div>
  );
}

type InputProps = CreateFormState & {
  setFormState: Dispatch<SetStateAction<CreateFormState>>;
};

export default function FolderSettingEditor({
  setFormState,
  ...formState
}: InputProps) {
  const tabs = useEditorTabs(formState, setFormState);
  const [selectedTab, setSelectedTab] = useState(tabs[0].title);
  return (
    <div className="mb-5 flex w-full flex-col items-center">
      <div
        className={clsx(
          "bg-gray-vapor min-h-[256px] w-full flex-1",
          "flex items-center justify-center",
        )}
      >
        <FolderBook isPreview {...formState} />
      </div>
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full gap-2 py-2 text-center">
          {tabs.map((tab) => (
            <EditorTab
              key={tab.title}
              tab={tab}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          ))}
        </div>
        {tabs.find(({ title }) => selectedTab === title)?.component}
      </div>
    </div>
  );
}
