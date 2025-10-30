import { useGetLinkFilterTags } from '@/services/tag';

import { FolderLinkFilterState } from '@/libs/zustand/store';
import { clsx } from '@/utils/clsx';

import TagSelectorPopover from './link-tag-selector-popover';

interface Props extends Pick<FolderLinkFilterState, 'setTags' | 'tags'> {
  className?: string;
  selectBoxClassName?: string;
  dataTestId?: string;
}

export default function LinkTagSelector({ className, selectBoxClassName, tags, setTags, dataTestId }: Props) {
  const { totalTags } = useGetLinkFilterTags();

  return (
    <div className={clsx('relative', className && className)}>
      {/* 태그 필터 */}
      <TagSelectorPopover
        className={selectBoxClassName}
        dataTestId={dataTestId}
        selected={tags}
        setTags={setTags}
        totalTags={totalTags}
      />
    </div>
  );
}
