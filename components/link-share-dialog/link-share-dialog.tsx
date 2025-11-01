'use client';

import Image from 'next/image';

import { useCallback, useEffect } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

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
    if (!link?.url) {
      toast({ status: 'fail', message: '공유할 링크가 없습니다.' });
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: link.title || '주섬에서 발견한 링크',
        description: '흥미로운 링크를 공유합니다.',
        imageUrl: link.thumbnailURL || 'https://app.joosum.com/images/opengraph-image.png',
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
          <Dialog.Title className="text-24-32 font-bold text-black">공유하기</Dialog.Title>
          <div className="flex gap-10">
            <button className="flex flex-col items-center gap-1" type="button" onClick={handleCopyLink}>
              <Image alt="" height={60} src="/images/share-link.png" width={60} />
              <span className="text-14-22 font-normal tracking-[-0.2px] text-gray-900">링크 복사</span>
            </button>
            <button className="flex flex-col items-center gap-1" type="button" onClick={handleShareToKakao}>
              <Image alt="" height={60} src="/images/share-kakao-talk.png" width={60} />
              <span className="text-14-22 font-normal tracking-[-0.2px] text-gray-900">카카오톡</span>
            </button>
          </div>
        </div>
        <div className="mt-3 w-full">
          <button
            className="h-14 w-full rounded-lg bg-gray-500 transition-colors hover:bg-gray-600"
            type="button"
            onClick={handleClose}
          >
            <span className="text-16-24 font-bold tracking-[-0.2px] text-white">취소</span>
          </button>
        </div>
      </div>
    </DefaultDialog>
  );
}
