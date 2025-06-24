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
        children: "취소",
        onClick: onClose,
      }}
      submitProps={{
        children: "확인",
        onClick: handleLogout,
      }}
      submitLoading={logout.isPending}
    >
      <span className="text-2xl font-bold">로그아웃 하시겠습니까?</span>
    </ConfirmDialog>
  );
}
