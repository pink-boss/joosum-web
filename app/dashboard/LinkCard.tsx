import { sendGTMEvent } from "@next/third-parties/google";
import { useEffect, useState } from "react";

import ImageWithFallback from "@/components/ImageWithFallback";
import useIncrementViewCount from "@/hooks/link/useIncrementViewCount";
import { Link } from "@/types/link.types";
import { krDateFormatter } from "@/utils/date";

const WIDTH = 354;

type LinkCardProps = {
  link: Link;
  index: number;
};

export default function LinkCard({ link, index }: LinkCardProps) {
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const [hiddenCount, setHiddenCount] = useState(0);

  const mutation = useIncrementViewCount(link);

  const handleOpenLink = () => {
    sendGTMEvent({
      event: "click.card_home",
    });
    mutation.mutate();
  };

  useEffect(() => {
    const calculateVisibleTags = () => {
      let currentWidth = 0;
      const tempTags: string[] = [];

      // 임시 요소를 만들어서 각 태그의 실제 너비를 계산
      const tempElement = document.createElement("div");
      tempElement.style.position = "absolute";
      tempElement.style.visibility = "hidden";
      tempElement.style.padding = "4px 12px"; // px-3 py-1과 동일
      tempElement.style.whiteSpace = "nowrap";
      document.body.appendChild(tempElement);

      for (let i = 0; i < link.tags?.length; i++) {
        const tag = link.tags[i];
        tempElement.textContent = tag;
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
    window.addEventListener("resize", calculateVisibleTags);

    return () => {
      window.removeEventListener("resize", calculateVisibleTags);
    };
  }, [link.tags]);
  return (
    <div
      className="flex flex-none cursor-pointer flex-col gap-4 pb-4"
      onClick={handleOpenLink}
    >
      <div className="relative h-[184px] w-[374px] flex-none">
        <ImageWithFallback
          src={link.thumbnailURL}
          alt={`${link.title}-thumbnail`}
          useFill
          className="rounded-lg object-cover"
          unoptimized
          index={index}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-[374px] truncate text-lg font-bold">{link.title}</div>
        <div className="flex flex-wrap gap-2">
          {visibleTags.map((tag, index) => (
            <div
              key={index}
              className="whitespace-nowrap rounded-[50px] bg-gray-vapor px-3 py-1"
            >
              {tag}
            </div>
          ))}
          {hiddenCount > 0 && (
            <div className="rounded-[50px] bg-gray-vapor px-3 py-1">
              +{hiddenCount}
            </div>
          )}
        </div>
        <div className="text-sm text-gray-slate">
          {`${krDateFormatter(link.createdAt)}에 주섬주섬`}
        </div>
      </div>
    </div>
  );
}
