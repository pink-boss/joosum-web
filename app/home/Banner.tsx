import Image from "next/image";
import { Banner } from "../../types/banner.types";
import { useEffect, useState } from "react";
import { setInterval } from "timers";
import Link from "next/link";

type InputProps = {
  data: Banner[];
};

// TODO: 서버에서 배너 받아와서 5초마다 롤링
export default function BannerCard({ data }: InputProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % data.length);
    }, 5 * 1000);
    return () => clearInterval(timer);
  }, [data.length]);
  return (
    <Link href={data[current]?.clickURL ?? ""} target="_blank">
      <div className="flex items-center justify-center gap-40 rounded-xl bg-[#DFD9FF]">
        <div className="text-2xl text-[#2F2F2F]">
          <p>지금 볼 시간이 없다면?</p>
          <p className="flex">
            <span className="font-bold">잊지 않게 매주 알려드려요!</span>
            <Image
              src="/icons/icon-right.png"
              alt="right"
              width={30.71}
              height={30.71}
            />
          </p>
        </div>
        <Image src="/banner-image.png" alt="banner" width={193} height={129} />
        {/* <Image
          src={data[current]?.imageURL}
          alt="banner"
          width={193}
          height={129}
        /> */}
      </div>
    </Link>
  );
}
