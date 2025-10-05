import ToolbarButton from './link-list-toolbar-button';

interface Props {
  onChangeFolder: () => void;
  onChangeMode: () => void;
  onDeleteLinks: () => void;
  type: 'linkList' | 'searchResult';
}

export default function LinkListEditToolbar({ onDeleteLinks, onChangeFolder, onChangeMode, type }: Props) {
  return (
    <div className="ml-auto flex gap-2">
      {/* 링크 삭제 */}
      <ToolbarButton dataTestId={`deleteLink_editOn_${type}`} onClick={onDeleteLinks}>
        삭제
      </ToolbarButton>
      {/* 링크 폴더이동 */}
      <ToolbarButton dataTestId={`moveFolder_editOn_${type}`} onClick={onChangeFolder}>
        폴더이동
      </ToolbarButton>
      {/* 편집종료 */}
      <ToolbarButton isPrimary dataTestId={`editOff_${type}`} onClick={onChangeMode}>
        편집종료
      </ToolbarButton>
    </div>
  );
}
