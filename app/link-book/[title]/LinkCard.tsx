import { Link } from "@/types/link.types";
import { dateFormatter } from "@/utils/date";
import Image from "next/image";
import NextLink from "next/link";
import DrawerButton from "./DrawerButton";
import OpenShareButton from "../OpenShareButton";
import useIncrementViewCount from "@/hooks/link/useIncrementViewCount";
import ImageWithFallback from "@/components/ImageWithFallback";

type FolderLinkInputProps = { linkBookName: string };

function FolderLink({ linkBookName }: FolderLinkInputProps) {
  return (
    <NextLink
      data-testid="folder-link"
      href={`/link-book/${linkBookName}`}
      className="ml-5 flex flex-none items-center gap-1 text-sm"
      onClick={(e) => e.stopPropagation()}
    >
      <Image src="/icons/folder.png" alt="folder" width={16} height={16} />
      {linkBookName}
    </NextLink>
  );
}

type InputProps = { link: Link };

export default function LinkCard({ link }: InputProps) {
  const mutation = useIncrementViewCount(link);

  const handleOpenLink = () => {
    mutation.mutate();
  };

  return (
    <div
      className="flex h-[84px] flex-1 cursor-pointer justify-between gap-5"
      onClick={handleOpenLink}
    >
      <div className="relative h-[84px] w-[160px] flex-none">
        <ImageWithFallback
          src={link.thumbnailURL}
          alt={`${link.title}-thumbnail`}
          useFill
          className="rounded-lg object-cover"
        />
      </div>
      <div className="flex min-w-0 grow flex-col">
        <div className="truncate text-lg font-bold">{link.title}</div>
        <div className="text-gray-ink truncate">
          {link.tags.reduce((result, tag) => result + ` #${tag}`, "")}
        </div>
        <div className="text-gray-dim mt-auto flex gap-1">
          <div className="flex-none">{link.url}</div>|
          <div className="flex-none">
            {dateFormatter(link.createdAt, "2-digit")}
          </div>
          |
          <div className="flex-none">
            {link.readCount ? `${link.readCount}회 읽음` : `읽지 않음`}
          </div>
          <FolderLink linkBookName={link.linkBookName} />
        </div>
      </div>
      <div
        className="mt-auto flex flex-none cursor-default gap-2"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <OpenShareButton link={link} />
        <DrawerButton link={link} />
      </div>
    </div>
  );
}
