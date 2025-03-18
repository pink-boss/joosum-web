import { useOpenDialogStore } from "@/store/useDialogStore";
import clsx from "clsx";
import Image from "next/image";

type MenuInputProps = {
  title: string;
  onClick: () => void;
};

function Menu({ title, onClick }: MenuInputProps) {
  return (
    <div className="flex cursor-pointer justify-between" onClick={onClick}>
      <span>{title}</span>
      <Image
        src="/icons/icon-chevron-right.png"
        alt="open"
        width={24}
        height={24}
      />
    </div>
  );
}

export default function Setting() {
  const { openNotificationSetting, openTagSetting } = useOpenDialogStore();

  return (
    <div>
      <div className={clsx("bg-gray-ghost px-10 py-2.5", "font-bold")}>
        설정
      </div>
      <div
        className={clsx("flex flex-col gap-[10px] px-10 py-5", "font-semibold")}
      >
        <Menu title="알림 설정" onClick={() => openNotificationSetting(true)} />
        <Menu title="태그 관리" onClick={() => openTagSetting(true)} />
      </div>
    </div>
  );
}
