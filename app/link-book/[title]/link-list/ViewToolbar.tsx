import Dropdown from "@/components/Dropdown";
import ToolbarButton from "./ToolbarButton";
import { sortOptions } from "../../constants";
import { LinkSortState } from "@/store/link-sort/schema";

type InputProps = {
  linkSort: LinkSortState;
  handleChangeMode: () => void;
};

export default function ViewToolbar({
  linkSort,
  handleChangeMode,
}: InputProps) {
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
