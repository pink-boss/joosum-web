import dynamic from "next/dynamic";

const MutateLinkBookDialog = dynamic(
  () => import("@/app/my-folder/mutate/MutateDialog"),
  {
    loading: () => null,
    ssr: false,
  },
);
const DeleteLinkBookDialog = dynamic(
  () => import("@/app/my-folder/DeleteDialog"),
  {
    loading: () => null,
    ssr: false,
  },
);
const DeleteLinkDialog = dynamic(() => import("@/app/link-book/DeleteDialog"), {
  loading: () => null,
  ssr: false,
});

const AccountDialog = dynamic(() => import("./auth/AccountDialog"), {
  loading: () => null,
  ssr: false,
});

const DeleteAccountDialog = dynamic(
  () => import("./auth/DeleteAccountDialog"),
  {
    loading: () => null,
    ssr: false,
  },
);

const LogoutDialog = dynamic(() => import("./auth/LogoutDialog"), {
  loading: () => null,
  ssr: false,
});

const NotificationSettingDialog = dynamic(
  () => import("./NotificationSettingDialog"),
  {
    loading: () => null,
    ssr: false,
  },
);

const TagSettingDialog = dynamic(() => import("./tag/TagSettingDialog"), {
  loading: () => null,
  ssr: false,
});

export {
  MutateLinkBookDialog,
  DeleteLinkBookDialog,
  DeleteLinkDialog,
  AccountDialog,
  DeleteAccountDialog,
  LogoutDialog,
  NotificationSettingDialog,
  TagSettingDialog,
};
