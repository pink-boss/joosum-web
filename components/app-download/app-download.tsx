import Image from 'next/image';
import Link from 'next/link';

export const IOSDownload = () => {
  return (
    <Link
      href="https://apps.apple.com/kr/app/%EC%A3%BC%EC%84%AC-joosum/id6455258212"
      rel="noopener noreferrer"
      target="_blank"
    >
      <Image alt="app store" height={39} src="/images/download-app-store.png" width={124} />
    </Link>
  );
};

export const AndroidDownload = () => {
  return (
    <Link href="https://play.google.com/store/apps/details?id=com.joosum.app" rel="noopener noreferrer" target="_blank">
      <Image alt="google play" height={39} src="/images/download-google-play.png" width={124} />
    </Link>
  );
};
