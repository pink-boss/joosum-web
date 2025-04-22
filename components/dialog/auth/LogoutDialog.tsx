import clsx from "clsx";

import useLogout from "@/hooks/auth/useLogout";
import { useOpenDialogStore } from "@/store/useDialogStore";

import ConfirmDialog from "../ConfirmDialog";

export default function LogoutDialog() {
  const { isLogoutOpen: isOpen, openLogout: open } = useOpenDialogStore();

  const onClose = () => {
    open(false);
  };

  const logout = useLogout();

  async function handleLogout() {
    logout.mutate();
  }

  return (
    <ConfirmDialog
      testId="logout-confirm"
      open={isOpen}
      onCloseCallback={onClose}
      closeProps={{
        className:
          "w-[165px] h-[56px] rounded-lg bg-gray-silver font-bold text-white",
        children: "취소",
        onClick: onClose,
      }}
      submitProps={{
        className: clsx([
          ["h-[56px] w-[165px] rounded-lg bg-primary-500 font-bold text-white"],
        ]),
        children: "확인",
        onClick: handleLogout,
      }}
    >
      <span className="text-2xl font-bold">로그아웃 하시겠습니까?</span>
    </ConfirmDialog>
  );
}
