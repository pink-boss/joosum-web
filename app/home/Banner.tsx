"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Banner } from "../../types/banner.types";

type InputProps = {
  data: Banner[];
};

const bannerData = [
  {
    clickURL: "https://example.com/1",
    id: "banner1",
    imageURL: "/banner-image.png",
    title: "주섬주섬 담은 링크",
    subtitle: "알아보기 쉽게 정리해보세요.",
  },
  {
    clickURL: "https://example.com/2",
    id: "banner2",
    imageURL: "/banner-image.png",
    title: "지금 볼 시간이 없다면?",
    subtitle: "잊지 않게 매주 알려드려요.",
  },
];

export default function BannerCard({}: InputProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannerData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentBanner = bannerData[current];

  return (
    <Link href={currentBanner.clickURL} target="_blank">
      <div className="flex items-center justify-center gap-40 rounded-xl bg-primary-lavender">
        <div className="text-2xl text-gray-ink">
          <div key={current} className="animate-fade-in-up">
            <p>{currentBanner.title}</p>
            <p className="flex items-center">
              <span className="font-bold">{currentBanner.subtitle}</span>
              <Image
                src="/icons/icon-right.png"
                alt="right"
                width={30.71}
                height={30.71}
                className="ml-2"
              />
            </p>
          </div>
        </div>
        <Image
          src={currentBanner.imageURL}
          alt="banner"
          width={193}
          height={129}
        />
      </div>
    </Link>
  );
}
