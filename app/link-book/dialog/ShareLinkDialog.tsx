"use client";

import Image from "next/image";
import { useEffect } from "react";

import Dialog from "@/components/dialog/Dialog";
import { toast } from "@/components/notification/toast";
import useLinkCache from "@/hooks/link/useLinkCache";
import { useOpenDialogStore } from "@/store/useDialogStore";

export default function ShareLinkDialog() {
  const {
    key,
    isShareLinkOpen: isOpen,
    openShareLink: open,
  } = useOpenDialogStore();
  const link = useLinkCache(key);

  // 카카오 SDK 초기화
  useEffect(() => {
    window.Kakao.cleanup();

    const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
    if (kakaoAppKey) {
      window.Kakao.init(kakaoAppKey);
    } else {
      console.error(
        "카카오 앱 키가 설정되지 않았습니다. NEXT_PUBLIC_KAKAO_APP_KEY 환경변수를 설정해주세요.",
      );
    }
  }, []);

  const onClose = () => {
    open(false);
  };

  async function handleCopyLink() {
    if (link?.url) {
      await navigator.clipboard.writeText(link?.url);
      toast({ status: "success", message: "링크가 복사되었습니다." });
    }
  }

  async function handleShareToKakao() {
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
      toast({ status: "fail", message: "공유할 링크가 없습니다." });
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: link.title || "주섬에서 발견한 링크",
        description: "흥미로운 링크를 공유합니다.",
        imageUrl: link.thumbnailURL || "https://joosum.app/logo.png",
        link: {
          mobileWebUrl: link.url,
          webUrl: link.url,
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: link.url,
            webUrl: link.url,
          },
        },
      ],
    });
  }

  return (
    <Dialog open={isOpen} onCloseCallback={onClose} className="w-[421.78px]">
      <div className="flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-4">
          <span className="text-2xl font-bold">공유하기</span>
          <div className="flex gap-10">
            <button
              className="flex flex-col items-center gap-1"
              onClick={() => handleCopyLink()}
            >
              <Image
                src="/copy-link.png"
                alt="copy-link"
                width={60}
                height={60}
              />
              <span className="text-sm text-gray-black">링크 복사</span>
            </button>
            <button
              className="flex flex-col items-center gap-1"
              onClick={handleShareToKakao}
            >
              <Image src="/kakao.png" alt="kakao" width={60} height={60} />
              <span className="text-sm text-gray-black">카카오톡</span>
            </button>
          </div>
        </div>
        <div className="mt-3 w-full">
          <button
            className="h-[56px] w-full rounded-lg bg-gray-silver font-bold text-white"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </Dialog>
  );
}
