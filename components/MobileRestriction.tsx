import Head from "next/head";
import Image from "next/image";

import { AndroidDownload, IOSDownload } from "./app-download";

export default function MobileRestriction() {
  return (
    <>
      <Head>
        <title>주섬 - PC 환경 가드</title>
        <meta
          name="description"
          content="주섬은 PC 환경을 지원합니다. 모바일에서는 앱을 이용해주세요."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="mobile-restriction-fade-in flex min-h-screen w-full flex-col items-center justify-center gap-10 bg-gray-ghost">
        <div className="mobile-restriction-zoom-in">
          <Image
            src="/screen-safer.png"
            alt="Screen Safer"
            width={240}
            height={240}
            priority
          />
        </div>

        <div className="mobile-restriction-slide-in-2 text-center text-2xl font-semibold text-gray-ink">
          <p>주섬 웹서비스는 현재</p>
          <p>PC 환경에서만 지원하고 있어요.</p>
        </div>

        <div className="mobile-restriction-slide-in-3 text-center text-gray-graphite">
          <p>쾌적한 사용을 위해 최소 822px 이상의</p>
          <p>해상도에서 이용해주세요.</p>
        </div>

        <div className="mobile-restriction-slide-in-4 w-full space-y-4">
          <p className="text-center text-sm font-medium text-gray-ink">
            모바일에서는 앱을 이용해주세요
          </p>

          <div className="flex justify-center gap-4">
            <IOSDownload />
            <AndroidDownload />
          </div>
        </div>
      </div>
    </>
  );
}
