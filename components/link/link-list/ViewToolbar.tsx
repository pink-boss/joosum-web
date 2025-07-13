import Dropdown from "@/components/Dropdown";
import useSortOptions from "@/hooks/link/useSortOptions";
import { LinkSortState } from "@/store/link-sort/schema";

import ToolbarButton from "./ToolbarButton";

type InputProps = {
  linkSort: LinkSortState;
  handleChangeMode: () => void;
};

export default function ViewToolbar({
  linkSort,
  handleChangeMode,
}: InputProps) {
  const sortOptions = useSortOptions();
  return (
    <div className="ml-auto flex items-center gap-2">
      <Dropdown
        options={sortOptions}
        selected={linkSort.field}
        setSelected={linkSort.setField}
      />
      <ToolbarButton isPrimary handleClick={handleChangeMode}>
        편집
      </ToolbarButton>
    </div>
  );
}
