import { useOpenDialogStore } from "@/store/useDialogStore";
import {
  DeleteLinkBookDialog,
  DeleteLinkDialog,
  MutateLinkBookDialog,
} from "./dynamic";
import { DeleteDrawerLinkDialog } from "@/app/link-book/drawer/dynamic";
import {
  ReassignLinkBookDialog,
  ShareLinkDialog,
} from "@/app/link-book/dialog/dynamic";

export default function DynamicOpenDialogs() {
  const {
    isMutateLinkBookOpen,
    isDeleteLinkBookOpen,
    isDeleteLinkOpen,
    isDeleteDrawerLinkOpen,
    isReassignLinkBookOpen,
    isShareLinkOpen,
  } = useOpenDialogStore();

  return (
    <>
      {isMutateLinkBookOpen && <MutateLinkBookDialog />}
      {isDeleteLinkBookOpen && <DeleteLinkBookDialog />}
      {isDeleteLinkOpen && <DeleteLinkDialog />}
      {isDeleteDrawerLinkOpen && <DeleteDrawerLinkDialog />}
      {isReassignLinkBookOpen && <ReassignLinkBookDialog />}
      {isShareLinkOpen && <ShareLinkDialog />}
    </>
  );
}