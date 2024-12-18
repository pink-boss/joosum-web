import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { Link } from "@/types/link.types";
import { dateFormatter } from "@/utils/date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import NextLink from "next/link";
import DrawerButton from "./DrawerButton";

type InputProps = { link: Link };

export default function LinkCard({ link }: InputProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => (
      await fetch(`/api/links/${link.linkId}/read-count`), { method: "PUT" }
    ),
    onSuccess: (result) => {
      if ("error" in result) {
        alert(result.error);
      } else {
        queryClient.setQueryData<Link>(
          ["link", "title", link.title],
          (prevLink) => {
            if (prevLink) {
              return {
                ...prevLink,
                readCount: prevLink.readCount + 1,
              };
            }
            return prevLink;
          },
        );
        window.open(link.url, "_blank");
      }
    },
  });

  const handleOpenLink = () => {
    mutation.mutate();
  };
  return (
    <div
      className="flex h-[84px] flex-1 cursor-pointer justify-between gap-5"
      onClick={handleOpenLink}
    >
      <div className="relative h-[84px] w-[160px] flex-none">
        <Image
          src={link.thumbnailURL}
          alt={`${link.title}-thumbnail`}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex min-w-0 grow flex-col">
        <div className="truncate text-lg font-bold">{link.title}</div>
        <div className="truncate text-[#2F2F2F]">
          {link.tags.reduce((result, tag) => result + ` #${tag}`, "")}
        </div>
        <div className="mt-auto flex gap-1 text-text-secondary">
          <div className="flex-none">{link.url}</div>|
          <div className="flex-none">
            {dateFormatter(link.createdAt, "2-digit")}
          </div>
          |
          <div className="flex-none">
            {link.readCount ? `${link.readCount}회 읽음` : `읽지 않음`}
          </div>
          <NextLink
            data-testid="folder-link"
            href={`/my-folder/${link.linkBookId}`}
            className="ml-5 flex flex-none items-center gap-1 text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src="/icons/folder.png"
              alt="folder"
              width={16}
              height={16}
            />
            {link.linkBookName}
          </NextLink>
        </div>
      </div>
      <div
        className="mt-auto flex flex-none cursor-default gap-2"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {/* TODO: 공유하기 */}
        <Image
          src="/icons/icon-download.png"
          alt="download"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <DrawerButton link={link} />
      </div>
    </div>
  );
}
