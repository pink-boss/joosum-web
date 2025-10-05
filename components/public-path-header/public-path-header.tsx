import Image from 'next/image';
import Link from 'next/link';

export default function PublicPathHeader() {
  return (
    <header className="fixed left-0 top-0 z-50 h-[82px] w-full bg-white">
      <div className="flex h-full items-center px-20">
        <Link className="flex items-center gap-2" href="/">
          <div className="relative">
            <Image priority alt="Joosum Logo" height={32} src="/logo/header-logo@3x.png" width={32} />
          </div>
          <span className="font-['PT_Sans_Caption'] text-[32px] font-bold leading-[41px] text-primary-500">Joosum</span>
        </Link>
      </div>
    </header>
  );
}
