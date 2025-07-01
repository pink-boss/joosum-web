import clsx from "clsx";
import {
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  RefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { toast } from "@/components/notification/toast/toast";
import { isValidName } from "@/utils/regexp";

type InputProps = {
  tags: string[];
  setTags: (tags: string[]) => void;
  disabled?: boolean;
};

export default function Tag({ tags, setTags, disabled = false }: InputProps) {
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [input, setInput] = useState<string>("");
  const [isComposing, setIsComposing] = useState(false);

  const handleSubmit = () => {
    const trimmedInput = input.trim();

    if (tags.length == 10) {
      toast({
        message: "태그는 10개까지 선택할 수 있어요.",
        status: "warning",
      });
    } else if (!trimmedInput) {
      return; // 빈 문자열은 무시
    } else if (!isValidName(trimmedInput)) {
      toast({
        message: "태그는 한글, 영문, 숫자, 언더스코어(_)만 사용할 수 있어요.",
        status: "warning",
      });
    } else if (tags.includes(trimmedInput)) {
      toast({
        message: "이미 추가된 태그입니다.",
        status: "warning",
      });
    } else {
      setTags([...tags, trimmedInput]);
      setInput("");
    }
  };

  const handleTypeInput = (e: KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return; // 조합 중이면 무시
    if (["Enter", " "].includes(e.key)) {
      e.preventDefault();
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
    <div
      data-testid="tags-input"
      className={clsx("flex flex-col gap-2", "text-gray-black")}
    >
      <div className="flex justify-between px-2">
        <label htmlFor="tag-input" className="text-lg font-semibold">
          태그
        </label>
        <span className="text-sm">{tags?.length ?? 0}/10</span>
      </div>
      <TagWrapper
        inputRef={inputRef}
        disabled={disabled}
        setIsActive={setIsActive}
      >
        <div
          className={clsx(
            "flex justify-between p-3",
            "rounded-lg border",
            isActive
              ? "border-primary-500 bg-primary-100"
              : "border-gray-ghost bg-gray-ghost",
          )}
        >
          <div
            role="list"
            className={clsx("flex flex-wrap items-center gap-2")}
          >
            {tags?.map((tag, index) => (
              <div
                key={index}
                role="listitem"
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
              data-testid="tag-input"
              ref={inputRef}
              id="tag-input"
              name="tag-input"
              className="min-w-[120px] flex-1 bg-transparent p-1 outline-none"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleTypeInput}
              placeholder={!tags?.length ? "태그를 추가해보세요." : undefined}
              onFocus={() => setIsActive(true)}
              onBlur={() => setIsActive(false)}
              disabled={disabled}
              maxLength={10}
              onCompositionStart={() => setIsComposing(true)}
              onCompositionEnd={() => setIsComposing(false)}
            />
          </div>
          {input && (
            <button
              type="button"
              className={clsx(
                "ml-auto w-28 px-2",
                "font-semibold text-primary-400",
              )}
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
  setIsActive: (isActive: boolean) => void;
  disabled?: boolean;
  inputRef: RefObject<HTMLInputElement>;
};

function TagWrapper({
  children,
  disabled,
  setIsActive,
  inputRef,
}: TagWrapperInputProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!disabled) {
      setIsActive(true);

      inputRef.current?.focus();
    }
  };

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
  }, [setIsActive]);

  return (
    <div ref={wrapperRef} onClick={handleClick}>
      {children}
    </div>
  );
}
