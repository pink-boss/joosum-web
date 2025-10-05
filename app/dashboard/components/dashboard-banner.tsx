'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useMemo, useState } from 'react';

import clsx from 'clsx';

import { DASHBOARD_BANNER_DATA } from './constants';

export default function DashboardBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % DASHBOARD_BANNER_DATA.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentBanner = useMemo(() => DASHBOARD_BANNER_DATA[activeIndex], [activeIndex]);

  return (
    <Link data-testid="banner_home" href={currentBanner.clickURL} target="_blank">
      <div
        className={clsx(
          'flex items-center rounded-xl bg-primary-lavender',
          'justify-between gap-4 px-10',
          'pc:justify-center pc:gap-40 pc:px-10',
        )}
      >
        <div className="text-xl text-gray-ink pc:text-2xl">
          <div key={activeIndex} className="animate-fade-in-up">
            <p>{currentBanner.title}</p>
            <p className="flex items-center">
              <span className="font-bold">{currentBanner.subtitle}</span>
              <Image alt="right" className="ml-1 pc:ml-2" height={30.71} src="/icons/icon-right.png" width={30.71} />
            </p>
          </div>
        </div>
        <Image priority alt="banner" height={129} src={currentBanner.imageURL} width={193} />
      </div>
    </Link>
  );
}
