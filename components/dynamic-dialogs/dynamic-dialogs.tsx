import { useDialogStore, useSubDialogStore } from '@/libs/zustand/store';

import {
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
  TagSettingDialog,
} from './dynamic';

export default function DynamicDialogs() {
  const {
    isMutateFolderOpen,
    isDeleteFolderOpen,
    isDeleteLinkOpen,
    isReassignFolderOpen,
    isShareLinkOpen,
    isAccountOpen,
    isDeleteAccountOpen,
    isLogoutOpen,
    isNotificationSettingOpen,
    isTagSettingOpen,
    isAppDownloadOpen,
  } = useDialogStore();

  const { isDeleteTagConfirmOpen } = useSubDialogStore();

  return (
    <>
      {/* 폴더 생성, 수정 및 삭제 */}
      {isMutateFolderOpen && <FolderMutateDialog />}
      {isDeleteFolderOpen && <FolderDeleteDialog />}
      {/* 폴더 이동 */}
      {isReassignFolderOpen && <FolderReassignDialog />}

      {/* 링크 삭제 */}
      {isDeleteLinkOpen && <LinkDeleteDialog />}
      {/* 링크 공유 */}
      {isShareLinkOpen && <LinkShareDialog />}

      {/* 계정 관리 */}
      {isAccountOpen && <AccountDialog />}
      {/* 회원 탈퇴 */}
      {isDeleteAccountOpen && <AccountDeleteDialog />}
      {/* 로그아웃 */}
      {isLogoutOpen && <LogoutDialog />}

      {/* 알림 설정 */}
      {isNotificationSettingOpen && <NotificationSettingDialog />}

      {/* 태그 설정 */}
      {isTagSettingOpen && <TagSettingDialog />}
      {/* 태그 삭제 */}
      {isDeleteTagConfirmOpen && <TagDeleteConfirmDialog />}

      {/* 앱 다운로드 */}
      {isAppDownloadOpen && <AppDownloadDialog />}

      {/* {isDeleteDrawerLinkOpen &&   />} */}
    </>
  );
}
