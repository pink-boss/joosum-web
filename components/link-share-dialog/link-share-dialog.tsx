'use client';

import Image from 'next/image';

import { useCallback, useEffect } from 'react';

import { useGetLinkCache } from '@/services/link';

import { DefaultDialog } from '@/components/default-dialog';

import { useDialogStore } from '@/libs/zustand/store';
import { toast } from '@/utils/toast';

export default function LinkShareDialog() {
  const { key, isShareLinkOpen: isOpen, openShareLink: open } = useDialogStore();

  const link = useGetLinkCache({ currentLinkId: key });

  // 카카오 SDK 초기화
  useEffect(() => {
    window.Kakao.cleanup();

    const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    if (kakaoAppKey) {
      window.Kakao.init(kakaoAppKey);
    } else {
      toast({
        status: 'fail',
        message: '카카오 앱 키가 설정되지 않았습니다. NEXT_PUBLIC_KAKAO_APP_KEY 환경변수를 설정해주세요.',
      });
    }
  }, []);

  const handleClose = useCallback(() => {
    open(false);
  }, [open]);

  const handleCopyLink = useCallback(async () => {
    if (link?.url) {
      await navigator.clipboard.writeText(link?.url);
      toast({ status: 'success', message: '링크가 복사되었습니다.' });
    }
  }, [link?.url]);

  const handleShareToKakao = useCallback(async () => {
    // window.Kakao.Share.createDefaultButton({
    //   container: "#kakaotalk-share-btn",
    //   objectType: "text",
    //   text: "기본 템플릿으로 제공하는 텍스트 템플릿은 텍스트를 최대 200자까지 표시할 수 있습니다. 텍스트 템플릿은 텍스트 영역과 하나의 기본 버튼을 가집니다. 임의의 버튼을 설정할 수도 있습니다. 여러 장의 이미지, 프로필 정보 등 보다 확장된 형태의 카카오톡 공유는 다른 템플릿을 이용해 보낼 수 있습니다.",
    //   link: {
    //     mobileWebUrl: "https://developers.kakao.com",
    //     webUrl: "https://developers.kakao.com",
    //   },
    // });
    if (!link?.url) {
      toast({ status: 'fail', message: '공유할 링크가 없습니다.' });
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: link.title || '주섬에서 발견한 링크',
        description: '흥미로운 링크를 공유합니다.',
        imageUrl: link.thumbnailURL || 'https://joosum.app/logo.png',
        link: {
          mobileWebUrl: link.url,
          webUrl: link.url,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: link.url,
            webUrl: link.url,
          },
        },
      ],
    });
  }, [link?.url, link?.title, link?.thumbnailURL]);

  return (
    <DefaultDialog className="w-[421.78px]" open={isOpen} onCloseCallback={handleClose}>
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-4">
          <span className="text-2xl font-bold">공유하기</span>
          <div className="flex gap-10">
            <button className="flex flex-col items-center gap-1" type="button" onClick={handleCopyLink}>
              <Image alt="" height={60} src="/images/share-link.png" width={60} />
              <span className="text-sm text-gray-900">링크 복사</span>
            </button>
            <button className="flex flex-col items-center gap-1" type="button" onClick={handleShareToKakao}>
              <Image alt="" height={60} src="/images/share-kakao-talk.png" width={60} />
              <span className="text-sm text-gray-900">카카오톡</span>
            </button>
          </div>
        </div>
        <div className="mt-3 w-full">
          <button
            className="h-[56px] w-full rounded-lg bg-gray-500 font-bold text-white"
            type="button"
            onClick={handleClose}
          >
            취소
          </button>
        </div>
      </div>
    </DefaultDialog>
  );
}
