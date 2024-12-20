import Drawer from "@/components/Drawer";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { CreateFormState } from "@/types/link.types";
import { krDateFormatter } from "@/utils/date";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TagBadge } from "../[title]/tag-selector/SelectedTags";
import SelectLinkBook from "../dialog/SelectLinkBook";
import Header from "./Header";
import { Button } from "@/app/my-folder/CreateDialogButton";
import TagSelector from "../[title]/tag-selector";
import { clearTimeout, setTimeout } from "timers";
import useUpdateLink from "@/hooks/link/useUpdateLink";
import { useOpenDialogStore } from "@/store/useDialogStore";
import ImageWithFallback from "@/components/ImageWithFallback";

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
            <ImageWithFallback src={link.thumbnailURL} alt="thumbnail" />
          </div>
          <div>
            <div className="flex flex-col gap-6">
              <div className="text-gray-black flex flex-col gap-2">
                <label htmlFor="title" className="px-2 text-lg font-semibold">
                  제목
                </label>
                <input
                  data-testid="title"
                  id="title"
                  name="title"
                  className={clsx(
                    "h-[48px] w-full p-3",
                    "border-gray-ghost bg-gray-ghost rounded-lg border",
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
              <div className="text-gray-black flex flex-col gap-2">
                <div className="flex justify-between px-2">
                  <label htmlFor="title" className="text-lg font-semibold">
                    폴더
                  </label>
                  <Button className="text-primary-500 flex font-semibold">
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
                  className="bg-gray-ghost border-none"
                />
              </div>
              <div className="text-gray-black flex flex-col gap-2">
                <div className="flex justify-between px-2">
                  <label htmlFor="title" className="text-lg font-semibold">
                    태그
                  </label>
                  <button
                    className="text-primary-500 flex font-semibold"
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
          <div className="text-gray-slate mt-10 flex gap-1 text-xs">
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
            className="bg-primary-lavender rounded-lg py-[10px] text-center text-sm font-semibold text-white"
            style={{ backgroundColor: toast.bgColor, color: toast.textColor }}
          >
            {toast.message}
          </div>
        )}

        <div className="flex justify-center gap-1">
          <button
            className="bg-gray-silver h-[56px] w-[220.5px] rounded-lg font-bold text-white"
            onClick={handleDelete}
          >
            삭제
          </button>
          <button
            className={clsx(
              "h-[56px] w-[220.5px] rounded-lg font-bold text-white",
              !formState.title
                ? "bg-gray-vapor cursor-not-allowed"
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
