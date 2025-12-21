import {
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useGetLinkFilterTags, useUpsertTagsSetting } from '@/services/tag';

import { clsx } from '@/utils/clsx';
import { isValidName } from '@/utils/regexp';
import { toast } from '@/utils/toast';

import { CloseFillIcon } from '@/assets/icons';

import LinkDrawerRecentTag from './link-drawer-recent-tag';

interface Props {
  disabled?: boolean;
  setTags: (tags: string[]) => void;
  tags: string[];
}

export default function LinkDrawerTag({ tags, setTags, disabled = false }: Props) {
  const { totalTags } = useGetLinkFilterTags();
  const upsertTags = useUpsertTagsSetting({});

  const inputRef = useRef<HTMLInputElement>(null);
  const recentTagsRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [isActive, setIsActive] = useState(false);
  const [input, setInput] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [topOffset, setTopOffset] = useState<number | undefined>(undefined);

  const handleSubmit = useCallback(() => {
    const trimmedInput = input.trim();

    if (tags.length == 10) {
      toast({
        message: '태그는 10개까지 선택할 수 있어요.',
        status: 'warning',
      });
    } else if (!trimmedInput) {
      return; // 빈 문자열은 무시
    } else if (!isValidName(trimmedInput)) {
      toast({
        message: '태그는 한글, 영문, 숫자, 언더스코어(_)만 사용할 수 있어요.',
        status: 'warning',
      });
    } else if (tags.includes(trimmedInput)) {
      toast({
        message: '이미 추가된 태그입니다.',
        status: 'warning',
      });
    } else {
      if (!totalTags.includes(trimmedInput)) {
        const newTagList = [trimmedInput, ...(totalTags ?? [])];
        upsertTags.mutate(newTagList);
      }
      setTags([...tags, trimmedInput]);
      setInput('');
    }
  }, [input, tags, totalTags, upsertTags, setTags]);

  const handleTypeInput = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (isComposing) return; // 조합 중이면 무시
      if ([' ', 'Enter'].includes(e.key)) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [isComposing, handleSubmit],
  );

  const handlePreventActive = useCallback((event: ReactMouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const handleRemoveTag = useCallback(
    (index: number) => {
      setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
    },
    [tags, setTags],
  );

  const handleSelectRecentTag = useCallback(
    (tag: string) => {
      if (tags.length == 10) {
        toast({
          message: '태그는 10개까지 선택할 수 있어요.',
          status: 'warning',
        });
      } else if (tags.includes(tag)) {
        toast({
          message: '이미 추가된 태그입니다.',
          status: 'warning',
        });
      } else {
        setTags([...tags, tag]);
        setInput('');
        setIsActive(false);
      }
    },
    [setTags, tags, setInput, setIsActive],
  );

  useEffect(() => {
    if (isActive && inputRef.current && wrapperRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      const wrapperRect = wrapperRef.current.getBoundingClientRect();
      const top = Math.max(inputRect.bottom - wrapperRect.top + 12, 52); // 4px offset
      setTopOffset(top);
    }
  }, [isActive, tags, input]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between px-1">
        <label className="text-18-26 font-semibold tracking-[-0.2px] text-black" htmlFor="tag-input">
          태그
        </label>
        <span className="text-14-22 font-normal tracking-[-0.2px] text-gray-900">{tags?.length ?? 0}/10</span>
      </div>
      <TagWrapper disabled={disabled} inputRef={inputRef} setIsActive={setIsActive} wrapperRef={wrapperRef}>
        <div
          className={clsx(
            'flex justify-between rounded-lg border p-2.75',
            isActive ? 'border-primary-500 bg-primary-100' : 'border-gray-200 bg-gray-200',
          )}
        >
          <div className="flex flex-wrap items-center gap-2">
            {tags?.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1 rounded-full bg-gray-300 px-2 py-1"
                onClick={handlePreventActive}
              >
                <span className="text-12-20 font-normal tracking-[-0.2px] text-black">{tag}</span>
                <button data-testid="delete_tag" type="button" onClick={() => handleRemoveTag(index)}>
                  <CloseFillIcon aria-hidden="true" className="size-4 text-gray-500" />
                </button>
              </div>
            ))}
            <input
              ref={inputRef}
              disabled={disabled}
              id="tag-input"
              maxLength={10}
              name="tag-input"
              placeholder={!tags?.length ? '태그를 추가해보세요.' : undefined}
              type="text"
              value={input}
              onBlur={() => {
                if (!recentTagsRef.current) setIsActive(false);
              }}
              onChange={(e) => setInput(e.target.value)}
              onCompositionEnd={() => setIsComposing(false)}
              onCompositionStart={() => setIsComposing(true)}
              onFocus={() => setIsActive(true)}
              onInput={(e) => {
                // 한글 초과 입력 처리
                if (e.currentTarget.value.length > 10) {
                  e.currentTarget.value = e.currentTarget.value.slice(0, 10);
                }
              }}
              onKeyDown={handleTypeInput}
              className={clsx(
                'min-w-30 flex-1 bg-transparent text-16-24 font-normal tracking-[-0.2px] text-gray-900 placeholder:text-gray-600',
                isActive && 'font-semibold placeholder:font-normal placeholder:text-gray-900',
              )}
            />
          </div>
          {input && (
            <button
              className="ml-auto w-14.5"
              data-testid="add_tag"
              type="button"
              onClick={(e) => {
                handlePreventActive(e);
                handleSubmit();
              }}
            >
              <span className="text-16-24 font-semibold tracking-[-0.2px] text-primary-400">생성하기</span>
            </button>
          )}
        </div>
        {isActive && topOffset !== undefined && (
          <LinkDrawerRecentTag
            handleSelectRecentTag={handleSelectRecentTag}
            recentTagsRef={recentTagsRef}
            top={topOffset}
            totalTags={totalTags}
          />
        )}
      </TagWrapper>
    </div>
  );
}

function TagWrapper({
  children,
  disabled,
  setIsActive,
  inputRef,
  wrapperRef,
}: {
  children: ReactNode;
  disabled?: boolean;
  inputRef: RefObject<HTMLInputElement>;
  setIsActive: (isActive: boolean) => void;
  wrapperRef: RefObject<HTMLDivElement>;
}) {
  const handleClick = useCallback(() => {
    if (!disabled) {
      setIsActive(true);

      inputRef.current?.focus();
    }
  }, [disabled, setIsActive, inputRef]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsActive, wrapperRef]);

  return (
    <div ref={wrapperRef} className="relative" onClick={handleClick}>
      {children}
    </div>
  );
}
