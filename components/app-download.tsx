import Image from "next/image";
import Link from "next/link";

export const IOSDownload = () => {
  return (
    <Link
      href="https://apps.apple.com/kr/app/%EC%A3%BC%EC%84%AC-joosum/id6455258212"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src="/app-store.png" alt="app store" width={124} height={39} />
    </Link>
  );
};

export const AndroidDownload = () => {
  return (
    <Link
      href="https://play.google.com/store/apps/details?id=com.joosum.app"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image src="/google-play.png" alt="google play" width={124} height={39} />
    </Link>
  );
};
