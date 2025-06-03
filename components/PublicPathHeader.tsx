import Image from "next/image";
import Link from "next/link";

export default function PublicPathHeader() {
  return (
    <header className="fixed left-0 top-0 z-50 h-[82px] w-full bg-white">
      <div className="flex h-full items-center px-20">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative">
            <Image
              src="/logo/header-logo@3x.png"
              alt="Joosum Logo"
              width={32}
              height={32}
              priority
            />
          </div>
          <span className="font-['PT_Sans_Caption'] text-[32px] font-bold leading-[41px] text-primary-500">
            Joosum
          </span>
        </Link>
      </div>
    </header>
  );
}
