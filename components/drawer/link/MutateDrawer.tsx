import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

import OpenShareButton from "@/app/link-book/OpenShareButton";
import Drawer from "@/components/drawer/Drawer";
import ImageWithFallback from "@/components/ImageWithFallback";
import useDeleteDrawerLink from "@/hooks/link/useDeleteDrawerLink";
import useUpdateLink from "@/hooks/link/useUpdateLink";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { CreateFormState } from "@/types/link.types";
import { krDateFormatter } from "@/utils/date";

import { defaultValues } from "./data";
import Folder from "./Folder";
import Header from "./Header";
import LinkInput from "./LinkInput";
import PrimaryButton from "./PrimaryButton";
import SecondaryButton from "./SecondaryButton";
import Tag from "./Tag";
import TitleInput from "./TitleInput";

export default function MutateLinkDrawer() {
  const {
    link,
    isLinkDrawerOpen: isOpen,
    openLinkDrawer: open,
    mode,
  } = useOpenDrawerStore();

  const [formState, setFormState] = useState<CreateFormState>(defaultValues);

  const onClose = useCallback(() => {
    setFormState(defaultValues);
    open(false);
  }, [open]);

  const { mutate: updateMutate, isPending: isUpdatePending } =
    useUpdateLink(onClose);
  const { mutate: deleteMutate, isPending: isDeletePending } =
    useDeleteDrawerLink(onClose, link?.linkId || "");

  const handleSubmit = async () => {
    updateMutate(formState as Required<CreateFormState>);
  };

  const handleDelete = () => {
    deleteMutate();
  };

  useEffect(() => {
    setFormState(link ?? defaultValues);
  }, [link, link?.linkBookId, setFormState]);

  if (mode !== "mutate" || !link) return null;

  return (
    <Drawer open={isOpen} onCloseCallback={onClose}>
      <div className="flex flex-1 flex-col gap-10">
        <Header
          onClose={onClose}
          center={
            <div className="flex items-center gap-1">
              <Image
                src="/icons/icon-folder.svg"
                alt="folder"
                width={20}
                height={20}
                unoptimized
              />
              <span className="text-gray-dim">{link.linkBookName}</span>
            </div>
          }
          right={<OpenShareButton link={link} />}
        />
        <div className="flex flex-col gap-6 px-10">
          <div className="relative h-[260px] w-[414px] flex-none">
            <ImageWithFallback
              src={link.thumbnailURL}
              alt="thumbnail"
              unoptimized
              useFill
              className="rounded-lg object-scale-down"
              index={link.index ?? 0}
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
            tags={formState.tags ?? []}
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
      <div className="mt-auto flex justify-center gap-3 px-10">
        <SecondaryButton loading={isDeletePending} onClick={handleDelete}>
          삭제
        </SecondaryButton>
        <PrimaryButton
          title={formState.title}
          loading={isUpdatePending}
          onClick={handleSubmit}
        >
          수정
        </PrimaryButton>
      </div>
    </Drawer>
  );
}
