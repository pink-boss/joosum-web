import { clearTimeout, setTimeout } from "timers";

import Image from "next/image";
import { useEffect, useState } from "react";

import OpenShareButton from "@/app/link-book/OpenShareButton";
import Drawer from "@/components/drawer/Drawer";
import ImageWithFallback from "@/components/ImageWithFallback";
import useUpdateLink from "@/hooks/link/useUpdateLink";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { CreateFormState } from "@/types/link.types";
import { krDateFormatter } from "@/utils/date";

import Buttons from "./Buttons";
import { defaultValues } from "./data";
import Folder from "./Folder";
import Header from "./Header";
import LinkInput from "./LinkInput";
import Tag from "./Tag";
import TitleInput from "./TitleInput";

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

export default function MutateLinkDrawer() {
  const {
    link,
    isLinkDrawerOpen: isOpen,
    openLinkDrawer: open,
  } = useOpenDrawerStore();
  const { openDeleteDrawerLink } = useOpenDialogStore();

  const [formState, setFormState] = useState<CreateFormState>(defaultValues);
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

  const updateLink = useUpdateLink(handleMutateSuccessCallback);
  const handleSubmit = async () => {
    updateLink.mutate(formState as Required<CreateFormState>);
  };

  const handleDelete = () => {
    openDeleteDrawerLink(true);
  };

  useEffect(() => {
    setFormState(link ?? defaultValues);
  }, [link, link?.linkBookId]);

  if (!link) return null;

  return (
    <Drawer open={isOpen} onCloseCallback={onClose}>
      <div className="flex flex-col gap-10">
        <Header
          onClose={onClose}
          center={
            <div className="flex items-center gap-1">
              <Image
                src="/icons/icon-folder2.png"
                alt="folder"
                width={20}
                height={20}
              />
              <span className="text-gray-dim">{link.linkBookName}</span>
            </div>
          }
          right={<OpenShareButton link={link} />}
        />
        <div className="flex flex-col gap-6 px-10">
          <div className="relative w-[414px] flex-none">
            <ImageWithFallback
              src={link.thumbnailURL}
              alt="thumbnail"
              unoptimized
            />
          </div>
          <LinkInput
            value={formState.url}
            setFormState={setFormState}
            disabled={true}
          />
          <TitleInput
            value={formState.title}
            setValue={(value) => {
              setFormState((prev) => ({
                ...prev,
                title: value,
              }));
            }}
          />
          <Folder
            linkBookId={formState.linkBookId}
            setLinkBookId={(linkBookName, linkBookId) =>
              setFormState((prev) => ({
                ...prev,
                linkBookName,
                linkBookId,
              }))
            }
            disabled={false}
          />
          <Tag
            tags={formState.tags}
            setTags={(tags) => setFormState((prev) => ({ ...prev, tags }))}
          />
          <div className="mt-10 flex gap-1 text-xs text-gray-slate">
            <span>{krDateFormatter(link.createdAt)}에 주섬주섬</span>
            <span>|</span>
            <span>
              {link.readCount ? `${link.readCount}회 읽음` : `읽지 않음`}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-auto px-10">
        <Buttons
          title={formState.title}
          closeBtnName="삭제"
          onCloseCallback={handleDelete}
          submitBtnName="수정"
          onSubmitCallback={handleSubmit}
        />
      </div>
    </Drawer>
  );
}
