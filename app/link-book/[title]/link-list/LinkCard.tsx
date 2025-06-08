import Image from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import ImageWithFallback from "@/components/ImageWithFallback";
import useIncrementViewCount from "@/hooks/link/useIncrementViewCount";
import { useSearchBarStore } from "@/store/useSearchBarStore";
import { Link } from "@/types/link.types";
import { dateFormatter } from "@/utils/date";

import OpenShareButton from "../../OpenShareButton";
import DrawerButton from "../DrawerButton";

type FolderLinkInputProps = { linkBookName: string };

function FolderLink({ linkBookName }: FolderLinkInputProps) {
  return (
    <NextLink
      data-testid="folder-link"
      href={`/link-book/${linkBookName}`}
      className="flex flex-none items-center gap-1 text-sm"
      onClick={(e) => e.stopPropagation()}
    >
      <Image src="/icons/folder.png" alt="folder" width={16} height={16} />
      {linkBookName}
    </NextLink>
  );
}

type InputProps = { link: Link };

export default function LinkCard({ link }: InputProps) {
  const pathname = usePathname();
  const mutation = useIncrementViewCount(link);
  const { title: highlightKeyword } = useSearchBarStore();

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
          unoptimized
        />
      </div>
      <div className="flex min-w-0 grow flex-col">
        <div className="w-2/3 truncate text-lg font-bold">
          {pathname.startsWith("/search") && highlightKeyword
            ? link.title
                .split(new RegExp(`(${highlightKeyword})`, "gi"))
                .map((part, i) =>
                  part.toLowerCase() === highlightKeyword.toLowerCase() ? (
                    <span key={i} className="text-primary-400">
                      {part}
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  ),
                )
            : link.title}
        </div>
        <div className="w-2/3 truncate text-gray-ink">
          {link.tags?.reduce((result, tag) => result + ` #${tag}`, "")}
        </div>
        <div className="mt-auto flex gap-4 text-gray-dim">
          <div className="flex min-w-0 gap-1">
            {/* TODO: 너비 조정 */}
            <div className="truncate">{link.url}</div>|
            <div className="flex-none">
              {dateFormatter(link.createdAt, "2-digit")}
            </div>
            |
            <div className="flex-none">
              {link.readCount ? `${link.readCount}회 읽음` : `읽지 않음`}
            </div>
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
