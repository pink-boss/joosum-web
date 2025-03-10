import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

type NewTabLinkInputType = {
  href: string;
  title: string;
} & Pick<HTMLAttributes<HTMLSpanElement>, "className">;

function NewTabLink({ href, title, className }: NewTabLinkInputType) {
  return (
    <Link
      className="flex justify-between"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className={className}>{title}</span>
      <Image
        src="/icons/icon-new-window.png"
        alt="new-tab"
        width={24}
        height={24}
      />
    </Link>
  );
}

// TODO: 이용 문의
export default function Support() {
  return (
    <div
      className={clsx("flex flex-col gap-[10px] px-10 py-5", "font-semibold")}
    >
      <NewTabLink
        href="https://joosum.notion.site/a078243be717462296cbe664a121212c"
        title="개인정보처리방침"
        className="font-extrabold"
      />
      <NewTabLink
        href="https://joosum.notion.site/6df241a6e3174b8fbfc7933a506a0b1e"
        title="서비스 이용약관"
      />
      <div className="flex justify-between">
        <span>이용 문의</span>
        <Image
          src="/icons/icon-new-window.png"
          alt="new-window-open"
          width={24}
          height={24}
        />
      </div>

      <NewTabLink
        href="https://joosum.notion.site/d1bf0517402744ee804c7d645a472610"
        title="공지 사항"
      />
    </div>
  );
}
