import dynamic from 'next/dynamic';

const FolderMutateDialog = dynamic(() => import('../folder-mutate-dialog'), {
  loading: () => null,
  ssr: false,
});

const FolderDeleteDialog = dynamic(() => import('../folder-delete-dialog'), {
  loading: () => null,
  ssr: false,
});

const FolderReassignDialog = dynamic(() => import('../folder-reassign-dialog'), {
  loading: () => null,
  ssr: false,
});

const LinkDeleteDialog = dynamic(() => import('../link-delete-dialog'), {
  loading: () => null,
  ssr: false,
});

const LinkShareDialog = dynamic(() => import('../link-share-dialog'), {
  loading: () => null,
  ssr: false,
});

const TagSettingsDialog = dynamic(() => import('../tag-settings-dialog'), {
  loading: () => null,
  ssr: false,
});

const TagDeleteConfirmDialog = dynamic(() => import('../tag-delete-confirm-dialog'), {
  loading: () => null,
  ssr: false,
});

// const DrawerLinkDeleteDialog = dynamic(() => import('../drawer-link-delete-dialog'), {
//   loading: () => null,
//   ssr: false,
// });

const AccountDialog = dynamic(() => import('../account-dialog'), {
  loading: () => null,
  ssr: false,
});

const AccountDeleteDialog = dynamic(() => import('../account-delete-dialog'), {
  loading: () => null,
  ssr: false,
});

const LogoutDialog = dynamic(() => import('../logout-dialog'), {
  loading: () => null,
  ssr: false,
});

const NotificationSettingDialog = dynamic(() => import('../notification-settings-dialog'), {
  loading: () => null,
  ssr: false,
});

const AppDownloadDialog = dynamic(() => import('../app-download-dialog'), {
  loading: () => null,
  ssr: false,
});

export {
  AccountDeleteDialog,
  AccountDialog,
  AppDownloadDialog,
  FolderDeleteDialog,
  FolderMutateDialog,
  FolderReassignDialog,
  LinkDeleteDialog,
  LinkShareDialog,
  LogoutDialog,
  NotificationSettingDialog,
  TagDeleteConfirmDialog,
  TagSettingsDialog,
};
