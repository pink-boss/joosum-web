import Image from 'next/image';
import Link from 'next/link';

export default function PublicPathHeader() {
  return (
    <header className="fixed left-0 top-0 z-50 h-20.5 w-full bg-white">
      <div className="flex h-full items-center px-20">
        <Link className="flex items-center gap-2" href="/">
          <div className="relative">
            <Image priority alt="Joosum Logo" height={32} src="/images/header-logo.png" width={32} />
          </div>
          <Image priority alt="Joosum" height={41} src="/images/header-logo-text.png" width={118} />
        </Link>
      </div>
    </header>
  );
}
