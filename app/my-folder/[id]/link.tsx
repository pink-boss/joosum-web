import { Link as LinkType } from "@/app/home/type";
import { dateFormatter } from "@/utils/date";
import Image from "next/image";
import Link from "next/link";

type InputProps = { link: LinkType };

// TODO: 링크안에 링크 x
export default function LinkComponent({ link }: InputProps) {
  const handleOpenLink = () => {
    // TODO: 조회수 1 증가
  };
  return (
    <Link
      data-testid="url-link"
      target="_blank"
      href={link.url}
      className="flex h-[84px] flex-1 justify-between gap-5"
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
          <div className="flex-none">{dateFormatter(link.createdAt)}</div>|
          <div className="flex-none">
            {link.readCount ? `${link.readCount}회 읽음` : `읽지 않음`}
          </div>
          <Link
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
          </Link>
        </div>
      </div>
      <div
        className="mt-auto flex flex-none cursor-default gap-2"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <Image
          src="/icons/icon-download.png"
          alt="download"
          width={24}
          height={24}
          className="cursor-pointer"
        />
        <button>
          <Image
            src="/icons/icon-more-vertical-gray.png"
            alt="more-vertical"
            width={24}
            height={24}
          />
        </button>
      </div>
    </Link>
  );
}
