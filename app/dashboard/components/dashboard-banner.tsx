'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useEffect, useMemo, useState } from 'react';

import { RightIcon } from '@/assets/icons';

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
      <div className="flex items-center justify-between gap-4 rounded-xl bg-primary-200 px-10 pc:justify-center pc:gap-40 pc:px-10">
        <div>
          <div key={activeIndex} className="animate-fade-in-up">
            <h2 className="text-20-28 font-normal text-gray-800 pc:text-24-32">{currentBanner.title}</h2>
            <div className="flex items-center">
              <h3 className="text-20-28 font-bold text-gray-800 pc:text-24-32">{currentBanner.subtitle}</h3>
              <RightIcon aria-hidden="true" className="ml-1 text-gray-800 pc:ml-2" height={30.71} width={30.71} />
            </div>
          </div>
        </div>
        <Image priority alt="banner" height={129} src={currentBanner.imageURL} width={193} />
      </div>
    </Link>
  );
}
