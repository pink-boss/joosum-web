import Dropdown from '@/components/dropdown';

import { useLinkSortOptions } from '@/hooks/utils';
import { LinkField, LinkSortState } from '@/libs/zustand/schema';

import ToolbarButton from './link-list-toolbar-button';

interface Props {
  onChangeMode: () => void;
  linkSort: LinkSortState;
  sortDataTestId?: string;
  editDataTestId?: string;
}

export default function ViewToolbar({ linkSort, onChangeMode, sortDataTestId, editDataTestId }: Props) {
  const sortOptions = useLinkSortOptions();

  return (
    <div className="ml-auto flex items-center gap-2">
      <Dropdown
        dataTestId={sortDataTestId}
        options={sortOptions}
        selected={linkSort.field}
        setSelected={(option) => linkSort.setField(option as LinkField)}
      />
      <ToolbarButton isPrimary dataTestId={editDataTestId} onClick={onChangeMode}>
        편집
      </ToolbarButton>
    </div>
  );
}
