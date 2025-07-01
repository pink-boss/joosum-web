import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type SelectBoxProps = {
  selected: string[];
  isOpen: boolean | undefined;
  setIsOpen: (isOpen: boolean) => void;
  className?: string;
};

export function SelectBox({
  selected,
  isOpen,
  setIsOpen,
  className,
}: SelectBoxProps) {
  const tagsRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const [hiddenCount, setHiddenCount] = useState(0);

  useEffect(() => {
    const maxWidth = tagsRef.current?.clientWidth;

    if (maxWidth) {
      if (previewRef.current) {
        document.body.removeChild(previewRef.current);
      }

      const preview = document.createElement("div");
      previewRef.current = preview;

      preview.style.display = "flex";
      preview.style.gap = "0.25rem";
      preview.style.visibility = "hidden";
      preview.style.position = "absolute";
      document.body.appendChild(preview);

      let newTags = [...selected];
      for (const tag of selected) {
        const span = document.createElement("span");
        span.textContent = `#${tag}`;
        preview.appendChild(span);

        if (maxWidth < preview.clientWidth) {
          const index = selected.findIndex((_tag) => _tag === tag);
          newTags = selected.slice(0, index);
          break;
        }
      }

      setVisibleTags(newTags);
    }

    return () => {
      if (previewRef.current && document.body.contains(previewRef.current)) {
        document.body.removeChild(previewRef.current);
        previewRef.current = null;
      }
    };
  }, [selected]);

  useEffect(() => {
    setHiddenCount(selected.length - visibleTags.length);
  }, [selected.length, visibleTags.length]);

  return (
    <button
      data-testid="open-button"
      onClick={() => setIsOpen(!isOpen)}
      className={clsx(
        "flex items-center justify-between gap-0.5 px-3 text-sm text-gray-dim",
        "h-[46px] w-full rounded-lg border border-gray-silver",
        className && className,
      )}
    >
      <div className="flex flex-1 items-center justify-between">
        <div ref={tagsRef} className="flex w-10/12 gap-1">
          {visibleTags.length ? (
            visibleTags.map((tag) => (
              <span key={`selected-tag-${tag}}`}>#{tag}</span>
            ))
          ) : (
            <span>전체</span>
          )}
        </div>
        {hiddenCount ? (
          <div className="mr-2" data-testid="hidden-count">
            +{hiddenCount}개
          </div>
        ) : undefined}
      </div>
      <Image src="/icons/icon-down3.png" alt="down" width={20} height={20} />
    </button>
  );
}
