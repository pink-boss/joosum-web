'use client';

import { GoogleTagManager } from '@next/third-parties/google';
import { usePathname } from 'next/navigation';

import { ReactNode, Suspense } from 'react';

import clsx from 'clsx';

import { DynamicDialogs } from '@/components/dynamic-dialogs';
import { DynamicDrawers } from '@/components/dynamic-drawers';
import Loader from '@/components/loader';
import { NotificationToastProvider } from '@/components/notification';
import PublicPathHeader from '@/components/public-path-header';
import ScreenSizeWrapper from '@/components/screen-size-wrapper';
import Gnb from '@/layouts/gnb';
import Lnb from '@/layouts/lnb';

import TanstackQueryProviders from '@/libs/tanstack-query/providers';
import { publicOnlyPaths } from '@/utils/path';

export default function ClientLayout({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname();
  const isPublicOnlyPath = publicOnlyPaths.some((path) => pathname.startsWith(path));

  return (
    <>
      <GoogleTagManager gtmId="GTM-K4FXLG7Z" />
      <ScreenSizeWrapper>
        {isPublicOnlyPath ? (
          <Component className="justify-center">
            <PublicPathHeader />
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </Component>
        ) : (
          <TanstackQueryProviders>
            <NotificationToastProvider>
              <div className="flex h-screen">
                <Lnb />
                <Component>
                  <Gnb />
                  <Suspense fallback={<Loader />}>
                    <main className="relative flex w-full flex-1">{children}</main>
                  </Suspense>
                  <div id="drawer-root" />
                  <div id="modal-root" />
                  <DynamicDrawers />
                  <DynamicDialogs />
                </Component>
              </div>
            </NotificationToastProvider>
          </TanstackQueryProviders>
        )}
      </ScreenSizeWrapper>
    </>
  );
}

function Component({
  children,
  className,
}: Readonly<{
  children: ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={clsx(
        'h-screen flex-1 overflow-x-hidden',
        'flex flex-col items-center',
        'bg-white text-black',
        className && className,
      )}
    >
      {children}
    </div>
  );
}
