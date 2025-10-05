import { ChangeEvent, useMemo } from 'react';

import Checkbox from '@/components/checkbox';

interface Props {
  cachedLinks: Set<string>;
  onAllCheckLinks: (e: ChangeEvent<HTMLInputElement>) => void;
  totalCount: number;
  dataTestId?: string;
}

export default function LinkListEditHeader({ totalCount, cachedLinks, onAllCheckLinks, dataTestId }: Props) {
  const hasAllChecked = useMemo(() => totalCount === cachedLinks.size, [totalCount, cachedLinks.size]);

  return (
    <div className="flex items-center gap-3 text-lg text-gray-ink">
      {/* 모두 선택 */}
      <div className="flex items-center gap-2 font-semibold">
        <Checkbox checked={hasAllChecked} dataTestId={dataTestId} id="allCheckbox" onChange={onAllCheckLinks} />
        <label htmlFor="allCheckbox">모두 선택</label>
      </div>
      <div>
        {cachedLinks.size}/{totalCount}개
      </div>
    </div>
  );
}
