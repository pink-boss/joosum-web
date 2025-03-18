import { clearTimeout, setTimeout } from "timers";

import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Button } from "@/app/my-folder/CreateDialogButton";
import Drawer from "@/components/Drawer";
import ImageWithFallback from "@/components/ImageWithFallback";
import useUpdateLink from "@/hooks/link/useUpdateLink";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { CreateFormState } from "@/types/link.types";
import { krDateFormatter } from "@/utils/date";

import Header from "./Header";
import { SelectLinkBook } from "@/app/link-book/dialog/dynamic";
import TagSelector from "@/app/link-book/[title]/tag-selector";
import { TagBadge } from "@/app/link-book/[title]/tag-selector/SelectedTags";

type ToastDefaultValues = {
  isOpen: boolean;
  bgColor: string;
  textColor: string;
  message: string;
};

const toastDefaultValues = {
  isOpen: false,
  bgColor: "#DFD9FF",
  textColor: "#2E2277",
  message: "수정되었습니다.",
};

const defaultValues: CreateFormState = {
  title: "",
  linkBookId: undefined,
  tags: [],
  thumbnailURL: undefined,
  url: undefined,
};

export default function MutateLinkDrawer() {
  const {
    link,
    isLinkDrawerOpen: isOpen,
    openLinkDrawer: open,
  } = useOpenDrawerStore();
  const { openDeleteDrawerLink } = useOpenDialogStore();

  const [formState, setFormState] = useState<CreateFormState>(defaultValues);
  const [isEditTag, setIsEditTag] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastDefaultValues>(toastDefaultValues);

  const onClose = () => {
    setFormState(defaultValues);
    open(false);
  };

  const handleMutateSuccessCallback = () => {
    setToast({
      isOpen: true,
      bgColor: toastDefaultValues.bgColor,
      textColor: toastDefaultValues.textColor,
      message: toastDefaultValues.message,
    });
  };

  const mutation = useUpdateLink(handleMutateSuccessCallback);
  const handleSubmit = async () => {
    mutation.mutate(formState as Required<CreateFormState>, {
      onError: (error: Error) => {
        setToast({
          isOpen: true,
          bgColor: "#fecaca",
          textColor: "#DC2626",
          message: error.message,
        });
      },
    });
  };

  const handleDelete = () => {
    openDeleteDrawerLink(true);
  };

  useEffect(() => {
    if (toast.isOpen) {
      const timer = setTimeout(() => {
        setToast(toastDefaultValues);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast.isOpen]);

  useEffect(() => {
    setFormState(link ?? defaultValues);
  }, [link, link?.linkBookId]);

  if (!link) return null;

  return (
    <Drawer open={isOpen} onCloseCallback={onClose}>
      <div className="flex flex-col gap-10">
        <Header
          linkBookName={link.linkBookName}
          onClose={onClose}
          link={link}
        />
        <div className="flex flex-col gap-4 px-10">
          <div className="relative h-[260px] w-[414px] flex-none">
            <ImageWithFallback
              src={link.thumbnailURL}
              alt="thumbnail"
              unoptimized
            />
          </div>
          <div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 text-gray-black">
                <label htmlFor="title" className="px-2 text-lg font-semibold">
                  제목
                </label>
                <input
                  data-testid="title"
                  id="title"
                  name="title"
                  className={clsx(
                    "h-[48px] w-full p-3",
                    "rounded-lg border border-gray-ghost bg-gray-ghost",
                  )}
                  value={formState.title}
                  onChange={(e) => {
                    setFormState((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }));
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 text-gray-black">
                <div className="flex justify-between px-2">
                  <label htmlFor="title" className="text-lg font-semibold">
                    폴더
                  </label>
                  <Button className="flex font-semibold text-primary-500">
                    <Image
                      src="/icons/icon-plus.png"
                      alt="new-folder"
                      width={24}
                      height={24}
                    />
                    새폴더
                  </Button>
                </div>
                <SelectLinkBook
                  linkBookId={formState.linkBookId}
                  setLinkBookId={(linkBookName, linkBookId) =>
                    setFormState((prev) => ({
                      ...prev,
                      linkBookName,
                      linkBookId,
                    }))
                  }
                  className="border-none bg-gray-ghost"
                />
              </div>
              <div className="flex flex-col gap-2 text-gray-black">
                <div className="flex justify-between px-2">
                  <label htmlFor="title" className="text-lg font-semibold">
                    태그
                  </label>
                  <button
                    className="flex font-semibold text-primary-500"
                    data-testid="edit-tags-button"
                    onClick={() => {
                      // setIsEditTag((prev) => !prev)
                    }}
                  >
                    {isEditTag ? (
                      "추가 종료"
                    ) : (
                      <>
                        <Image
                          src="/icons/icon-plus.png"
                          alt="new tag"
                          width={24}
                          height={24}
                        />
                        태그추가
                      </>
                    )}
                  </button>
                </div>
                {isEditTag ? (
                  <TagSelector
                    tags={formState.tags}
                    setTags={(tags) =>
                      setFormState((prev) => ({ ...prev, tags }))
                    }
                    selectBoxClassName="border-none bg-gray-ghost"
                  />
                ) : (
                  <TagBadge
                    tags={formState.tags}
                    setTags={(tags) =>
                      setFormState((prev) => ({ ...prev, tags }))
                    }
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mt-10 flex gap-1 text-xs text-gray-slate">
            <span>{krDateFormatter(link.createdAt)}에 주섬주섬</span>
            <span>|</span>
            <span>
              {link.readCount ? `${link.readCount}회 읽음` : `읽지 않음`}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-auto flex flex-col gap-5 px-10">
        {toast.isOpen && (
          <div
            data-testid="feedback-toast"
            className="rounded-lg bg-primary-lavender py-[10px] text-center text-sm font-semibold text-white"
            style={{ backgroundColor: toast.bgColor, color: toast.textColor }}
          >
            {toast.message}
          </div>
        )}

        <div className="flex justify-center gap-1">
          <button
            className="h-[56px] w-[220.5px] rounded-lg bg-gray-silver font-bold text-white"
            onClick={handleDelete}
          >
            삭제
          </button>
          <button
            className={clsx(
              "h-[56px] w-[220.5px] rounded-lg font-bold text-white",
              !formState.title
                ? "cursor-not-allowed bg-gray-vapor"
                : "bg-primary-500",
            )}
            disabled={!formState.title}
            onClick={handleSubmit}
          >
            수정
          </button>
        </div>
      </div>
    </Drawer>
  );
}
