import { useOpenDialogStore } from "@/store/useDialogStore";
import Image from "next/image";

export default function Logout() {
  const { openLogout } = useOpenDialogStore();
  return (
    <div
      className="flex cursor-pointer justify-between px-10 font-semibold"
      onClick={() => openLogout(true)}
    >
      <span>로그아웃</span>
      <Image src="/icons/icon-exit.png" alt="exit" width={24} height={24} />
    </div>
  );
}
