import { create } from 'zustand';

interface DialogState {
  key: string | undefined;

  // folder
  folderDataTestId: string;
  isMutateFolderOpen: boolean;
  isDeleteFolderOpen: boolean;
  isReassignFolderOpen: boolean;
  openMutateFolder: (isOpen: boolean, key?: string, dataTestId?: string) => void;
  openDeleteFolder: (isOpen: boolean, key?: string, dataTestId?: string) => void;
  openReassignFolder: (isOpen: boolean, dataTestId?: string) => void;

  // link
  linkDataTestId: string;
  isDeleteLinkOpen: boolean;
  isDeleteDrawerLinkOpen: boolean;
  isShareLinkOpen: boolean;
  openDeleteLink: (isOpen: boolean, dataTestId?: string) => void;
  openDeleteDrawerLink: (isOpen: boolean, dataTestId?: string) => void;
  openShareLink: (isOpen: boolean, key?: string, dataTestId?: string) => void;

  // auth
  authDataTestId: string;
  isAccountOpen: boolean;
  isDeleteAccountOpen: boolean;
  isLogoutOpen: boolean;
  openAccount: (isOpen: boolean, dataTestId?: string) => void;
  openDeleteAccount: (isOpen: boolean, dataTestId?: string) => void;
  openLogout: (isOpen: boolean, dataTestId?: string) => void;

  // notification
  notificationDataTestId: string;
  isNotificationSettingOpen: boolean;
  openNotificationSetting: (isOpen: boolean, dataTestId?: string) => void;

  // tag
  tagDataTestId: string;
  isTagSettingOpen: boolean;
  openTagSetting: (isOpen: boolean, dataTestId?: string) => void;

  // appDownload
  appDownloadDataTestId: string;
  isAppDownloadOpen: boolean;
  openAppDownload: (isOpen: boolean, dataTestId?: string) => void;
}

export const useDialogStore = create<DialogState>()((set) => ({
  key: undefined,

  // folder
  folderDataTestId: '',
  isMutateFolderOpen: false,
  isDeleteFolderOpen: false,
  isReassignFolderOpen: false,
  openMutateFolder: (isOpen, newKey, dataTestId) => {
    set({ isMutateFolderOpen: isOpen, key: isOpen ? newKey : undefined, folderDataTestId: dataTestId });
  },
  openDeleteFolder: (isOpen, newKey, dataTestId) => {
    set({ isDeleteFolderOpen: isOpen, key: isOpen ? newKey : undefined, folderDataTestId: dataTestId });
  },
  openReassignFolder: (isOpen, dataTestId) => set({ isReassignFolderOpen: isOpen, folderDataTestId: dataTestId }),

  // link
  linkDataTestId: '',
  isDeleteLinkOpen: false,
  isDeleteDrawerLinkOpen: false,
  isShareLinkOpen: false,
  openDeleteLink: (isOpen, dataTestId) => set({ isDeleteLinkOpen: isOpen, linkDataTestId: dataTestId }),
  openDeleteDrawerLink: (isOpen, dataTestId) => set({ isDeleteDrawerLinkOpen: isOpen, linkDataTestId: dataTestId }),
  openShareLink: (isOpen, newKey, dataTestId) =>
    set({ isShareLinkOpen: isOpen, key: isOpen ? newKey : undefined, linkDataTestId: dataTestId }),

  // auth
  authDataTestId: '',
  isAccountOpen: false,
  isDeleteAccountOpen: false,
  isLogoutOpen: false,
  openAccount: (isOpen, dataTestId) => set({ isAccountOpen: isOpen, authDataTestId: dataTestId }),
  openDeleteAccount: (isOpen, dataTestId) => set({ isDeleteAccountOpen: isOpen, authDataTestId: dataTestId }),
  openLogout: (isOpen, dataTestId) => set({ isLogoutOpen: isOpen, authDataTestId: dataTestId }),

  // notification
  notificationDataTestId: '',
  isNotificationSettingOpen: false,
  openNotificationSetting: (isOpen, dataTestId) =>
    set({ isNotificationSettingOpen: isOpen, notificationDataTestId: dataTestId }),

  // tag
  tagDataTestId: '',
  isTagSettingOpen: false,
  openTagSetting: (isOpen, dataTestId) => set({ isTagSettingOpen: isOpen, tagDataTestId: dataTestId }),

  // appDownload
  appDownloadDataTestId: '',
  isAppDownloadOpen: false,
  openAppDownload: (isOpen, dataTestId) => set({ isAppDownloadOpen: isOpen, appDownloadDataTestId: dataTestId }),
}));
