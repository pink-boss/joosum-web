import clsx from "clsx";
import { FolderBook } from "../folder";
import { CreateFormState } from "../type";
import { ReactNode, useState } from "react";
import useEditorTabs from "./useEditorTabs";

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
          ? "border-b-[2px] border-primary font-bold text-primary"
          : "text-[#909090]",
      )}
      onClick={() => setSelectedTab(tab.title)}
    >
      {tab.title}
    </div>
  );
}

// TODO: rest api 통신, fetch, update, delete
type InputProps = CreateFormState & {
  formAction: (formData: FormData) => void;
};

export default function FolderSettingEditor({
  formAction,
  ...state
}: InputProps) {
  const [localState, setLocalState] = useState<CreateFormState>(state);
  const tabs = useEditorTabs(localState, setLocalState);
  const [selectedTab, setSelectedTab] = useState(tabs[0].title);
  return (
    <>
      <div
        className={clsx(
          "min-h-[256px] w-full flex-1 bg-background-menu",
          "flex items-center justify-center",
        )}
      >
        <FolderBook isPreview {...localState} />
      </div>
      <form className="flex w-full flex-col gap-3" action={formAction}>
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
      </form>
    </>
  );
}
