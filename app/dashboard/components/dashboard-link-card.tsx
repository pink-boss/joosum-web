import { useCallback, useEffect, useState } from 'react';

import { useUpdateViewCount } from '@/services/link';

import ImageWithFallback from '@/components/image-with-fallback';

import { krDateFormatter } from '@/utils/date';

import { Link } from '@/types/link.types';

const WIDTH = 354;

interface Props {
  index: number;
  link: Link;
}

export default function DashboardLinkCard({ link, index }: Props) {
  const mutation = useUpdateViewCount({ link });

  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const [hiddenCount, setHiddenCount] = useState(0);

  const handleClick = useCallback(() => {
    mutation.mutate();
  }, [mutation]);

  useEffect(() => {
    const calculateVisibleTags = () => {
      let currentWidth = 0;
      const tempTags: string[] = [];

      // 임시 요소를 만들어서 각 태그의 실제 너비를 계산
      const tempElement = document.createElement('div');
      tempElement.style.position = 'absolute';
      tempElement.style.visibility = 'hidden';
      tempElement.style.padding = '4px 12px';
      tempElement.style.whiteSpace = 'nowrap';
      document.body.appendChild(tempElement);

      for (let i = 0; i < link.tags?.length; i++) {
        const tag = link.tags[i];
        tempElement.textContent = `#${tag}`;
        const tagWidth = tempElement.offsetWidth + 8; // 간격 8px 추가

        if (currentWidth + tagWidth > WIDTH && i > 0) {
          setHiddenCount(link.tags.length - tempTags.length);
          break;
        }

        currentWidth += tagWidth;
        tempTags.push(tag);
      }

      document.body.removeChild(tempElement);
      setVisibleTags(tempTags);
    };

    calculateVisibleTags();
    window.addEventListener('resize', calculateVisibleTags);

    return () => {
      window.removeEventListener('resize', calculateVisibleTags);
    };
  }, [link.tags]);

  return (
    <button className="flex flex-none flex-col gap-4 pb-4" data-testid="card_home" type="button" onClick={handleClick}>
      <div className="relative h-46 w-93.5 flex-none">
        <ImageWithFallback
          unoptimized
          useFill
          alt={`${link.title}-thumbnail`}
          className="rounded-lg object-cover"
          index={index}
          src={link.thumbnailURL}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="w-93.5 truncate text-left text-18-26 font-bold tracking-[-0.2px]">{link.title}</span>
        <div className="flex flex-wrap items-center gap-2">
          {visibleTags.map((tag, index) => (
            <span
              key={index}
              className="whitespace-nowrap rounded-12.5 bg-gray-300 px-3 py-1 text-14-22 font-normal tracking-[-0.2px] text-black"
            >
              #{tag}
            </span>
          ))}
          {hiddenCount > 0 && (
            <div className="rounded-12.5 bg-gray-300 px-3 py-1 text-14-22 font-normal tracking-[-0.2px] text-black">
              +{hiddenCount}
            </div>
          )}
        </div>
        <span className="text-left text-14-22 font-normal tracking-[-0.2px] text-gray-600">{`${krDateFormatter(link.createdAt)}에 주섬주섬`}</span>
      </div>
    </button>
  );
}
