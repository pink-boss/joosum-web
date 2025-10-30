import { ChangeEvent, useMemo } from 'react';

import Checkbox from '@/components/checkbox';

interface Props {
  cachedLinks: Set<string>;
  onAllCheckLinks: (e: ChangeEvent<HTMLInputElement>) => void;
  totalCount: number;
  dataTestId?: string;
}

export default function LinkListEditHeader({ totalCount, cachedLinks, onAllCheckLinks, dataTestId }: Props) {
  const hasAllChecked = useMemo(
    () => (totalCount > 0 ? totalCount === cachedLinks.size : false),
    [totalCount, cachedLinks.size],
  );

  return (
    <div className="flex items-center gap-3">
      {/* 모두 선택 */}
      <label
        className="flex items-center gap-2 text-18-26 font-semibold tracking-[-0.2px] text-gray-800"
        htmlFor="allCheckbox"
      >
        <Checkbox checked={hasAllChecked} dataTestId={dataTestId} id="allCheckbox" onChange={onAllCheckLinks} />
        모두 선택
      </label>
      <span className="text-18-26 font-normal tracking-[-0.2px] text-gray-800">
        {cachedLinks.size}/{totalCount}개
      </span>
    </div>
  );
}
