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
    <div className="flex h-21 w-full flex-1 cursor-pointer justify-between gap-5">
      <button
        className="flex w-full flex-1 cursor-pointer justify-between gap-5"
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
          <div className="truncate text-left text-lg font-bold">
            {pathname.startsWith('/search') && highlightKeyword
              ? link.title.split(new RegExp(`(${highlightKeyword})`, 'gi')).map((part, i) =>
                  part.toLowerCase() === highlightKeyword.toLowerCase() ? (
                    <span key={i} className="text-primary-400">
                      {part}
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  ),
                )
              : link.title}
          </div>
          <div className="truncate text-left text-gray-800">
            {link.tags?.reduce((result, tag) => result + ` #${tag}`, '')}
          </div>
          <div className="mt-auto flex gap-4 text-gray-700">
            <div className="flex min-w-0 gap-1">
              <div className="truncate">{extractDomain(link.url)}</div>|
              <div className="flex-none">{dateFormatter(link.createdAt, '2-digit')}</div>|
              <div className="flex-none">{link.readCount ? `${link.readCount}회 읽음` : `읽지 않음`}</div>
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
      className="flex flex-none items-center gap-1 text-sm"
      href={`/link-book/${linkBookName}`}
      onClick={(e) => e.stopPropagation()}
    >
      <FolderIcon aria-hidden="true" className="size-4 shrink-0 text-gray-500" />
      {linkBookName}
    </NextLink>
  );
}
