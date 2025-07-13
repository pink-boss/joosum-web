import { ChangeEvent } from "react";

import Checkbox from "@/components/Checkbox";

type InputProps = {
  totalCount: number;
  cachedLinks: Set<string>;
  handleAllCheckLinks: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function EditHeader({
  totalCount,
  cachedLinks,
  handleAllCheckLinks,
}: InputProps) {
  const hasAllChecked = totalCount === cachedLinks.size;
  return (
    <div className="flex items-center gap-3 text-lg text-gray-ink">
      <div className="flex items-center gap-2 font-semibold">
        <Checkbox
          onChange={handleAllCheckLinks}
          checked={hasAllChecked}
          id="allCheckbox"
        />
        <label htmlFor="allCheckbox">모두 선택</label>
      </div>
      <div>
        {cachedLinks.size}/{totalCount}개
      </div>
    </div>
  );
}
