import {
  ReassignLinkBookDialog,
  ShareLinkDialog,
} from "@/app/link-book/dialog/dynamic";
import { DeleteDrawerLinkDialog } from "@/app/link-book/drawer/dynamic";
import { useOpenDialogStore } from "@/store/useDialogStore";

import {
  AccountDialog,
  DeleteAccountDialog,
  DeleteLinkBookDialog,
  DeleteLinkDialog,
  DeleteTagConfirmDialog,
  LogoutDialog,
  MutateLinkBookDialog,
  NotificationSettingDialog,
} from "./dynamic";
import { useOpenSubDialogStore } from "@/store/useSubDialogStore";

export default function DynamicOpenDialogs() {
  const {
    isMutateLinkBookOpen,
    isDeleteLinkBookOpen,
    isDeleteLinkOpen,
    isDeleteDrawerLinkOpen,
    isReassignLinkBookOpen,
    isShareLinkOpen,
    isAccountOpen,
    isDeleteAccountOpen,
    isLogoutOpen,
    isNotificationSettingOpen,
  } = useOpenDialogStore();

  const { isDeleteTagConfirmOpen } = useOpenSubDialogStore();
  return (
    <>
      {isMutateLinkBookOpen && <MutateLinkBookDialog />}
      {isDeleteLinkBookOpen && <DeleteLinkBookDialog />}
      {isDeleteLinkOpen && <DeleteLinkDialog />}
      {isDeleteDrawerLinkOpen && <DeleteDrawerLinkDialog />}
      {isReassignLinkBookOpen && <ReassignLinkBookDialog />}
      {isShareLinkOpen && <ShareLinkDialog />}
      {isAccountOpen && <AccountDialog />}
      {isDeleteAccountOpen && <DeleteAccountDialog />}
      {isLogoutOpen && <LogoutDialog />}
      {isNotificationSettingOpen && <NotificationSettingDialog />}

      {isDeleteTagConfirmOpen && <DeleteTagConfirmDialog />}
    </>
  );
}
