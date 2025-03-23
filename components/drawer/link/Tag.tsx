import { toast } from "@/components/notification/toast";
import clsx from "clsx";
import { MouseEvent as ReactMouseEvent } from "react";

import { ReactNode, useEffect, useRef, useState } from "react";

type InputProps = {
  tags: string[];
  setTags: (tags: string[]) => void;
};

export default function Tag({ tags, setTags }: InputProps) {
  const [isActive, setIsActive] = useState(false);

  const [input, setInput] = useState<string | undefined>();

  const handleSubmit = () => {
    if (tags.length == 10) {
      toast({
        message: "태그는 10개까지 선택할 수 있어요.",
        status: "warning",
      });
    } else if (input) {
      setTags([...tags, input.trim()]);
      setInput("");
    }
  };

  const handleTypeInput = (value: string) => {
    if (["Enter", " "].includes(value)) {
      handleSubmit();
    }
  };

  const preventActive = (event: ReactMouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const removeTag = (index: number) => {
    setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
  };
  return (
    <div className={clsx("flex flex-col gap-2", "text-gray-black")}>
      <div className="flex justify-between px-2">
        <label htmlFor="title" className="text-lg font-semibold">
          태그
        </label>
        <span className="text-sm">{tags.length}/10</span>
      </div>
      <TagWrapper isActive={isActive} setIsActive={setIsActive}>
        <div
          className={clsx(
            "flex p-3",
            "rounded-lg border",
            isActive
              ? "border-primary-500 bg-inputactivebg"
              : "border-gray-ghost bg-gray-ghost",
          )}
        >
          <div className={clsx("flex flex-wrap items-center gap-2")}>
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1 rounded-full bg-gray-vapor px-2 py-1 text-xs"
                onClick={preventActive}
              >
                <span>{tag}</span>
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className={clsx(
                    "size-[13.33px] rounded-full bg-gray-silver",
                    "flex items-center justify-center pb-0.5 text-white",
                  )}
                >
                  &times;
                </button>
              </div>
            ))}
            <input
              className="min-w-[120px] flex-1 bg-transparent p-1 outline-none"
              type="text"
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyUp={(e) => handleTypeInput(e.key)}
              placeholder={!tags.length ? "태그를 추가해보세요." : undefined}
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
            />
          </div>
          {input && (
            <button
              className={clsx("w-28 px-2", "font-semibold text-primary-400")}
              onClick={(e) => {
                preventActive(e);
                handleSubmit();
              }}
            >
              생성하기
            </button>
          )}
        </div>
      </TagWrapper>
    </div>
  );
}

type TagWrapperInputProps = {
  children: ReactNode;
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
};

function TagWrapper({ children, isActive, setIsActive }: TagWrapperInputProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      onClick={() => {
        setIsActive(true);
      }}
    >
      {children}
    </div>
  );
}
