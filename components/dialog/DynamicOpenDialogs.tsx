import {
  ReassignLinkBookDialog,
  ShareLinkDialog,
} from "@/app/link-book/dialog/dynamic";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { useOpenSubDialogStore } from "@/store/useSubDialogStore";

import {
  AccountDialog,
  AppDownloadDialog,
  DeleteAccountDialog,
  DeleteDrawerLinkDialog,
  DeleteLinkBookDialog,
  DeleteLinkDialog,
  DeleteTagConfirmDialog,
  LogoutDialog,
  MutateLinkBookDialog,
  NotificationSettingDialog,
  TagSettingDialog,
} from "./dynamic";

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
    isTagSettingOpen,
    isAppDownloadOpen,
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
      {isTagSettingOpen && <TagSettingDialog />}
      {isAppDownloadOpen && <AppDownloadDialog />}

      {isDeleteTagConfirmOpen && <DeleteTagConfirmDialog />}
    </>
  );
}
