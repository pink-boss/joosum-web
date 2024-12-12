import Image from "next/image";
import { krDateFormatter } from "@/utils/date";
import { useEffect, useState } from "react";

const WIDTH = 374;

type LinkCardProps = {
  link: Link;
};

export default function LinkCard({ link }: LinkCardProps) {
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const [hiddenCount, setHiddenCount] = useState(0);

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

      for (let i = 0; i < link.tags.length; i++) {
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
    <div className="flex flex-col gap-4 pb-4">
      <Image
        className="rounded-lg"
        src={link.thumbnailURL}
        alt={`${link.thumbnailURL}`}
        width={WIDTH}
        height={184}
      />
      <div className="flex flex-col gap-2">
        <div className="truncate text-lg font-bold">{link.title}</div>
        <div className="flex flex-wrap gap-2">
          {visibleTags.map((tag, index) => (
            <div
              key={index}
              className="whitespace-nowrap rounded-[50px] bg-background-menu px-3 py-1"
            >
              {tag}
            </div>
          ))}
          {hiddenCount > 0 && (
            <div className="rounded-[50px] bg-background-menu px-3 py-1">
              +{hiddenCount}
            </div>
          )}
        </div>
        <div className="text-sm text-[#909090]">
          {`${krDateFormatter(link.createdAt)}에 주섬주섬`}
        </div>
      </div>
    </div>
  );
}
