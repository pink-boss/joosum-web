import Image from "next/image";

import { useOpenDialogStore } from "@/store/useDialogStore";
import { sendGTMEvent } from "@next/third-parties/google";

export default function Logout() {
  const { openLogout } = useOpenDialogStore();

  const onClickLogout = () => {
    sendGTMEvent({
      event: "click.logout_myPage",
    });
    openLogout(true);
  };
  return (
    <div
      className="flex cursor-pointer justify-between px-10 font-semibold"
      onClick={onClickLogout}
    >
      <span>로그아웃</span>
      <Image src="/icons/icon-exit.png" alt="exit" width={24} height={24} />
    </div>
  );
}
