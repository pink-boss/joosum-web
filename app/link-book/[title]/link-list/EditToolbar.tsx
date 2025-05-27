import ToolbarButton from "./ToolbarButton";

type InputProps = {
  handleDeleteLinks: () => void;
  handleChangeFolder: () => void;
  handleChangeMode: () => void;
};

export default function EditToolbar({
  handleDeleteLinks,
  handleChangeFolder,
  handleChangeMode,
}: InputProps) {
  return (
    <div className="ml-auto flex gap-2">
      <ToolbarButton handleClick={handleDeleteLinks}>삭제</ToolbarButton>
      <ToolbarButton handleClick={handleChangeFolder}>폴더이동</ToolbarButton>
      <ToolbarButton isPrimary handleClick={handleChangeMode}>
        편집종료
      </ToolbarButton>
    </div>
  );
}
