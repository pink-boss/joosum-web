import clsx from "clsx";
import Image from "next/image";

import Drawer from "@/components/Drawer";
import { useOpenDrawerStore } from "@/store/useDrawerStore";

export default function UserDrawer() {
  const { isUserDrawerOpen: isOpen, openUserDrawer: open } =
    useOpenDrawerStore();

  const onClose = () => {
    open(false);
  };

  return (
    <Drawer open={isOpen} onCloseCallback={onClose}>
      <div className="flex flex-col gap-10">
        <button className="px-5 py-1" onClick={onClose}>
          <Image
            src="/icons/icon-right-double.png"
            alt="close"
            width={24}
            height={24}
          />
        </button>
        <div className={clsx("flex flex-col gap-5", "text-lg text-gray-dim")}>
          <div>
            <div className={clsx("bg-gray-ghost px-10 py-2.5", "font-bold")}>
              내 계정
            </div>
            <div className="flex flex-col gap-[10px] px-10 py-5">
              <div className="font-semibold">내 계정</div>
              <div className="font-bold text-gray-black">
                pinkbossjoosum@gmail.com
              </div>
            </div>
          </div>
          <div>
            <div className={clsx("bg-gray-ghost px-10 py-2.5", "font-bold")}>
              설정
            </div>
            <div
              className={clsx(
                "flex flex-col gap-[10px] px-10 py-5",
                "font-semibold",
              )}
            >
              <div className="flex justify-between">
                <span>알림 설정</span>
                <Image
                  src="/icons/icon-chevron-right.png"
                  alt="open"
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex justify-between">
                <span>태그 관리</span>
                <Image
                  src="/icons/icon-chevron-right.png"
                  alt="open"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>
          <div>
            <div className={clsx("bg-gray-ghost px-10 py-2.5", "font-bold")}>
              개인정보처리방침
            </div>
            <div
              className={clsx(
                "flex flex-col gap-[10px] px-10 py-5",
                "font-semibold",
              )}
            >
              <div className="flex justify-between">
                <span>서비스 이용약관</span>
                <Image
                  src="/icons/icon-new-window.png"
                  alt="new-window-open"
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex justify-between">
                <span>이용 문의</span>
                <Image
                  src="/icons/icon-new-window.png"
                  alt="new-window-open"
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex justify-between">
                <span>공지 사항</span>
                <Image
                  src="/icons/icon-new-window.png"
                  alt="new-window-open"
                  width={24}
                  height={24}
                />
              </div>
            </div>
          </div>
          <div className={clsx("px-10 py-5", "border-t border-gray-silver")}>
            <div className="flex justify-between font-semibold">
              <span>로그아웃</span>
              <Image
                src="/icons/icon-exit.png"
                alt="exit"
                width={24}
                height={24}
              />
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
