"use client";

import { sendGTMEvent } from "@next/third-parties/google";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Banner } from "../../types/banner.types";

type InputProps = {
  data: Banner[];
};

const bannerData = [
  {
    clickURL: "https://www.notion.so/45776b3736494e29b182375cbaa50056?pvs=25",
    id: "banner1",
    imageURL: "/banner-image.png",
    title: "주섬주섬 담은 링크",
    subtitle: "알아보기 쉽게 정리해보세요.",
  },
  {
    clickURL: "https://www.notion.so/a694027a091c44dc87db37c63ae37611?pvs=25",
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

  const onClickBanner = () => {
    sendGTMEvent({
      event: "click.banner_home",
    });
  };

  return (
    <Link href={currentBanner.clickURL} target="_blank" onClick={onClickBanner}>
      <div
        className={clsx(
          "flex items-center rounded-xl bg-primary-lavender",
          "justify-between gap-4 px-10",
          "pc:justify-center pc:gap-40 pc:px-10",
        )}
      >
        <div className="text-xl text-gray-ink pc:text-2xl">
          <div key={current} className="animate-fade-in-up">
            <p>{currentBanner.title}</p>
            <p className="flex items-center">
              <span className="font-bold">{currentBanner.subtitle}</span>
              <Image
                src="/icons/icon-right.png"
                alt="right"
                width={30.71}
                height={30.71}
                className="ml-1 pc:ml-2"
              />
            </p>
          </div>
        </div>
        <Image
          src={currentBanner.imageURL}
          alt="banner"
          width={193}
          height={129}
          priority
        />
      </div>
    </Link>
  );
}
