import { ReactNode, useMemo } from 'react';

import { clsx } from '@/utils/clsx';

import { ChevronRightIcon } from '@/assets/icons';

interface Props {
  /** 더 보기 버튼 클릭 핸들러 */
  onClick: () => void;
  /** 남은 아이템 개수 */
  remainingCount: number;
  /** 버튼 텍스트 접두사 (예: "저장한", "읽지 않은", "링크") */
  textPrefix?: string;
  /** 버튼 텍스트 접미사 (예: "개 더 보기", "개 모두 보기") */
  textSuffix?: string;
  /** 버튼 스타일 변형 */
  variant?: 'card' | 'list';
  /** 커스텀 클래스명 */
  className?: string;
  dataTestId?: string;
  icon?: ReactNode;
}

const BASE_CLASSNAME = 'flex';

const VARIANT_CLASSNAME = {
  card: 'self-center rounded-lg py-4',
  list: 'justify-center p-4',
};

const CONTENT_VARIANT_CLASSNAME = {
  card: '',
  list: 'items-center gap-1 rounded-lg px-4 py-2 hover:bg-gray-100',
};

export default function LoadMoreButton(props: Props) {
  const {
    onClick,
    remainingCount,
    textPrefix = '',
    textSuffix = '개 더 보기',
    variant = 'card',
    className = '',
    dataTestId,
    icon,
  } = props;

  const displayCount = useMemo(() => (remainingCount > 999 ? '999+' : remainingCount), [remainingCount]);

  return (
    <div className={clsx(BASE_CLASSNAME, VARIANT_CLASSNAME[variant], className)}>
      <button
        className={`flex ${CONTENT_VARIANT_CLASSNAME[variant]}`}
        data-testid={dataTestId}
        type="button"
        onClick={onClick}
      >
        <span className="text-18-26 font-bold tracking-[-0.2px] text-gray-700">
          {textPrefix && `${textPrefix} `}
          링크 {displayCount}
          {textSuffix}
        </span>
        {icon || <ChevronRightIcon aria-hidden="true" className="size-6 text-gray-700" />}
      </button>
    </div>
  );
}
