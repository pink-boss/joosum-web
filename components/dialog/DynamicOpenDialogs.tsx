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
  MutateLinkBookDialog,
  NotificationSettingDialog,
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
    isNotificationSettingOpen,
  } = useOpenDialogStore();

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
      {isNotificationSettingOpen && <NotificationSettingDialog />}
    </>
  );
}
