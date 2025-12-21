import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

import { useCallback } from 'react';

import { useUpdateViewCount } from '@/services/link';

import ImageWithFallback from '@/components/image-with-fallback';
import LinkShareButton from '@/components/link-share-button';

import { useDrawerStore, useSearchBarStore } from '@/libs/zustand/store';
import { dateFormatter } from '@/utils/date';
import { extractDomain } from '@/utils/url-encoder';

import { FolderIcon, MoreVerticalIcon } from '@/assets/icons';

import { Link } from '@/types/link.types';

interface Props {
  index: number;
  link: Link;
  linkDataTestId?: string;
  kebabDataTestId?: string;
  type: 'linkList' | 'searchResult';
}

export default function LinkListLinkCard({ link, index, linkDataTestId, kebabDataTestId, type }: Props) {
  const pathname = usePathname();

  const { openLinkDrawer } = useDrawerStore();
  const { title: highlightKeyword } = useSearchBarStore();

  const mutation = useUpdateViewCount({ link });

  const handleNavigate = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  const handleClick = useCallback(() => {
    openLinkDrawer(true, 'mutate', link, type);
  }, [link, openLinkDrawer, type]);

  return (
    // 링크 클릭
    <div className="flex h-21 w-full flex-1 justify-between gap-5">
      <button
        className="flex w-full flex-1 justify-between gap-5"
        data-testid={linkDataTestId}
        type="button"
        onClick={handleNavigate}
      >
        <div className="relative h-21 w-40 flex-none">
          <ImageWithFallback
            unoptimized
            useFill
            alt={`${link.title}-thumbnail`}
            className="rounded-lg object-cover"
            index={index}
            src={link.thumbnailURL}
          />
        </div>
        <div className="flex min-w-0 grow flex-col">
          <span className="truncate text-left text-18-26 font-bold tracking-[-0.2px] text-black">
            {pathname.startsWith('/search') && highlightKeyword
              ? link.title.split(new RegExp(`(${highlightKeyword})`, 'gi')).map((part, i) =>
                  part.toLowerCase() === highlightKeyword.toLowerCase() ? (
                    <span key={i} className="inline text-primary-400">
                      {part}
                    </span>
                  ) : (
                    <span key={i} className="inline">
                      {part}
                    </span>
                  ),
                )
              : link.title}
          </span>
          <span className="truncate text-left text-14-22 font-normal tracking-[-0.2px] text-gray-800">
            {link.tags?.reduce((result, tag) => result + ` #${tag}`, '')}
          </span>
          <div className="mt-auto flex gap-4">
            <div className="flex min-w-0 gap-1">
              <span className="truncate text-14-22 font-normal tracking-[-0.2px] text-gray-700">
                {extractDomain(link.url)}
              </span>
              <span className="text-14-22 font-normal tracking-[-0.2px] text-gray-700">|</span>
              <span className="flex-none text-14-22 font-normal tracking-[-0.2px] text-gray-700">
                {dateFormatter(link.createdAt, '2-digit')}
              </span>
              <span className="text-14-22 font-normal tracking-[-0.2px] text-gray-700">|</span>
              <span className="flex-none text-14-22 font-normal tracking-[-0.2px] text-gray-700">
                {link.readCount ? `${link.readCount}회 읽음` : `읽지 않음`}
              </span>
            </div>
            <FolderLink linkBookName={link.linkBookName} />
          </div>
        </div>
      </button>
      <div className="mt-auto flex flex-none gap-2">
        <LinkShareButton link={link} />
        {/* 케밥 클릭 */}
        <button data-testid={kebabDataTestId} type="button" onClick={handleClick}>
          <MoreVerticalIcon aria-hidden="true" className="size-6 text-gray-500" />
        </button>
      </div>
    </div>
  );
}

function FolderLink({ linkBookName }: { linkBookName: string }) {
  return (
    <NextLink
      className="flex flex-none items-center gap-1"
      href={`/link-book/${linkBookName}`}
      onClick={(e) => e.stopPropagation()}
    >
      <FolderIcon aria-hidden="true" className="size-4 shrink-0 text-gray-500" />
      <span className="text-14-22 font-normal tracking-[-0.2px] text-gray-700">{linkBookName}</span>
    </NextLink>
  );
}
