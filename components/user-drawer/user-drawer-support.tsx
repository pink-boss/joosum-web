import Link from 'next/link';

import clsx from 'clsx';

import { ArrowTopRightIcon } from '@/assets/icons';

import { Account } from '@/types/account.types';

interface Props extends Pick<Account, 'email'> {}

export default function UserDrawerSupport({ email }: Props) {
  return (
    <div className={clsx('flex flex-col gap-2.5 px-10 py-5', 'font-semibold')}>
      <NewTabLink
        className="font-extrabold"
        dataTestId="privacyPolicy_myPage"
        href="https://joosum.notion.site/a078243be717462296cbe664a121212c"
        title="개인정보처리방침"
      />
      <NewTabLink
        dataTestId="termsOfService_myPage"
        href="https://joosum.notion.site/6df241a6e3174b8fbfc7933a506a0b1e"
        title="서비스 이용약관"
      />
      <NewTabLink dataTestId="contact_myPage" href={`https://joosum.com/contact?email=${email}`} title="이용 문의" />
      <NewTabLink
        dataTestId="notice_myPage"
        href="https://joosum.notion.site/d1bf0517402744ee804c7d645a472610"
        title="공지 사항"
      />
    </div>
  );
}

function NewTabLink({
  href,
  title,
  className,
  dataTestId,
}: {
  className?: string;
  dataTestId?: string;
  href: string;
  title: string;
}) {
  return (
    <Link
      className="flex justify-between"
      data-testid={dataTestId}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className={className}>{title}</span>
      <ArrowTopRightIcon aria-hidden="true" className="size-6 text-gray-500" />
    </Link>
  );
}
