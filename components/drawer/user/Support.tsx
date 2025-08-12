import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

import { Account } from "@/types/account.types";
import { sendGTMEvent } from "@next/third-parties/google";

type NewTabLinkInputType = {
  href: string;
  title: string;
} & Pick<HTMLAttributes<HTMLSpanElement>, "className" | "onClick">;

function NewTabLink({ href, title, className, onClick }: NewTabLinkInputType) {
  return (
    <Link
      className="flex justify-between"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
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

type InputProps = Pick<Account, "email">;

export default function Support({ email }: InputProps) {
  const onClickPrivacyPolicy = () => {
    sendGTMEvent({
      event: "click.PrivacyPolicy_myPage",
    });
  };

  const onClickTermsOfService = () => {
    sendGTMEvent({
      event: "click.termsOfService_myPage",
    });
  };

  const onClickContact = () => {
    sendGTMEvent({
      event: "click.contact_myPage",
    });
  };

  const onClickNotice = () => {
    sendGTMEvent({
      event: "click.notice_myPage",
    });
  };

  return (
    <div
      className={clsx("flex flex-col gap-[10px] px-10 py-5", "font-semibold")}
    >
      <NewTabLink
        href="https://joosum.notion.site/a078243be717462296cbe664a121212c"
        title="개인정보처리방침"
        className="font-extrabold"
        onClick={onClickPrivacyPolicy}
      />
      <NewTabLink
        href="https://joosum.notion.site/6df241a6e3174b8fbfc7933a506a0b1e"
        title="서비스 이용약관"
        onClick={onClickTermsOfService}
      />
      <NewTabLink
        href={`https://joosum.com/contact?email=${email}`}
        title="이용 문의"
        onClick={onClickContact}
      />
      <NewTabLink
        href="https://joosum.notion.site/d1bf0517402744ee804c7d645a472610"
        title="공지 사항"
        onClick={onClickNotice}
      />
    </div>
  );
}
