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

import clsx from 'clsx';

import { useGetLinkFilterTags, useUpsertTagsSetting } from '@/services/tag';

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

  const [isActive, setIsActive] = useState(false);
  const [input, setInput] = useState<string>('');
  const [isComposing, setIsComposing] = useState(false);

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

  return (
    <div className={clsx('flex flex-col gap-2', 'text-gray-900')}>
      <div className="flex justify-between px-2">
        <label className="text-lg font-semibold" htmlFor="tag-input">
          태그
        </label>
        <span className="text-sm">{tags?.length ?? 0}/10</span>
      </div>
      <TagWrapper disabled={disabled} inputRef={inputRef} setIsActive={setIsActive}>
        <div
          className={clsx(
            'flex justify-between p-3',
            'rounded-lg border',
            isActive ? 'border-primary-500 bg-primary-100' : 'border-gray-200 bg-gray-200',
          )}
        >
          <div className={clsx('flex flex-wrap items-center gap-2')}>
            {tags?.map((tag, index) => (
              <div
                key={index}
                className="flex items-center gap-1 rounded-full bg-gray-300 px-2 py-1 text-xs"
                onClick={handlePreventActive}
              >
                <span>{tag}</span>
                <button data-testid="delete_tag" type="button" onClick={() => handleRemoveTag(index)}>
                  <CloseFillIcon aria-hidden="true" className="size-4 text-gray-500" />
                </button>
              </div>
            ))}
            <input
              ref={inputRef}
              className="min-w-30 flex-1 bg-transparent p-1 outline-none"
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
              onKeyDown={handleTypeInput}
            />
          </div>
          {input && (
            <button
              className="ml-auto w-14.5 font-semibold tracking-[-0.2px] text-primary-400"
              data-testid="add_tag"
              type="button"
              onClick={(e) => {
                handlePreventActive(e);
                handleSubmit();
              }}
            >
              생성하기
            </button>
          )}
        </div>
        {isActive && (
          <LinkDrawerRecentTag
            handleSelectRecentTag={handleSelectRecentTag}
            recentTagsRef={recentTagsRef}
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
}: {
  children: ReactNode;
  disabled?: boolean;
  inputRef: RefObject<HTMLInputElement>;
  setIsActive: (isActive: boolean) => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

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
  }, [setIsActive]);

  return (
    <div ref={wrapperRef} className="relative" onClick={handleClick}>
      {children}
    </div>
  );
}
