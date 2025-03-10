import useQueryAccount from "@/hooks/useQueryAccount";
import { useOpenDialogStore } from "@/store/useDialogStore";

import clsx from "clsx";
import Image from "next/image";

export default function Account() {
  const { openAccount: openAccountDialog } = useOpenDialogStore();

  const { data } = useQueryAccount();

  const onOpenMyAccount = () => {
    openAccountDialog(true);
  };

  return (
    <div>
      <div className={clsx("bg-gray-ghost px-10 py-2.5", "font-bold")}>
        내 계정
      </div>
      <div className="flex flex-col gap-[10px] px-10 py-5">
        <div className="font-semibold">내 계정</div>
        <button
          data-testid="open-my-account"
          className="flex justify-between"
          onClick={onOpenMyAccount}
        >
          <span className="font-bold text-gray-black">{data?.email}</span>
          <Image
            src="/icons/icon-chevron-right.png"
            alt="open"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
}
