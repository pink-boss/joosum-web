import { create } from "zustand";

interface OpenDialogState {
  key: string | undefined;

  // linkBook
  isMutateLinkBookOpen: boolean;
  isDeleteLinkBookOpen: boolean;
  openMutateLinkBook: (isOpen: boolean, key?: string) => void;
  openDeleteLinkBook: (isOpen: boolean, key?: string) => void;

  // link
  isDeleteLinkOpen: boolean;
  isReassignLinkBookOpen: boolean;
  isDeleteDrawerLinkOpen: boolean;
  isShareLinkOpen: boolean;
  openDeleteLink: (isOpen: boolean) => void;
  openReassignLinkBook: (isOpen: boolean) => void;
  openDeleteDrawerLink: (isOpen: boolean) => void;
  openShareLink: (isOpen: boolean, key?: string) => void;

  // auth
  isAccountOpen: boolean;
  isDeleteAccountOpen: boolean;
  isLogoutOpen: boolean;
  openAccount: (isOpen: boolean) => void;
  openDeleteAccount: (isOpen: boolean) => void;
  openLogout: (isOpen: boolean) => void;

  // notification
  isNotificationSettingOpen: boolean;
  openNotificationSetting: (isOpen: boolean) => void;

  // tag
  isTagSettingOpen: boolean;
  openTagSetting: (isOpen: boolean) => void;

  // appDownload
  isAppDownloadOpen: boolean;
  openAppDownload: (isOpen: boolean) => void;
}

export const useOpenDialogStore = create<OpenDialogState>()((set) => ({
  key: undefined,

  // linkBook
  isMutateLinkBookOpen: false,
  isDeleteLinkBookOpen: false,
  openMutateLinkBook: (isOpen, newKey) => {
    set({ isMutateLinkBookOpen: isOpen, key: isOpen ? newKey : undefined });
  },
  openDeleteLinkBook: (isOpen, newKey) => {
    set({ isDeleteLinkBookOpen: isOpen, key: isOpen ? newKey : undefined });
  },

  // link
  isDeleteLinkOpen: false,
  isReassignLinkBookOpen: false,
  isDeleteDrawerLinkOpen: false,
  isShareLinkOpen: false,
  openDeleteLink: (isOpen) => set({ isDeleteLinkOpen: isOpen }),
  openReassignLinkBook: (isOpen) => set({ isReassignLinkBookOpen: isOpen }),
  openDeleteDrawerLink: (isOpen) => set({ isDeleteDrawerLinkOpen: isOpen }),
  openShareLink: (isOpen, newKey) =>
    set({ isShareLinkOpen: isOpen, key: isOpen ? newKey : undefined }),

  // auth
  isAccountOpen: false,
  isDeleteAccountOpen: false,
  isLogoutOpen: false,
  openAccount: (isOpen) => set({ isAccountOpen: isOpen }),
  openDeleteAccount: (isOpen) => set({ isDeleteAccountOpen: isOpen }),
  openLogout: (isOpen) => set({ isLogoutOpen: isOpen }),

  // notification
  isNotificationSettingOpen: false,
  openNotificationSetting: (isOpen) =>
    set({ isNotificationSettingOpen: isOpen }),

  // tag
  isTagSettingOpen: false,
  openTagSetting: (isOpen) => set({ isTagSettingOpen: isOpen }),

  // appDownload
  isAppDownloadOpen: false,
  openAppDownload: (isOpen) => set({ isAppDownloadOpen: isOpen }),
}));
