import { ResetIcon } from '@/assets/icons';

interface Props {
  onClick: () => void;
}

export default function ResetButton({ onClick }: Props) {
  return (
    <button className="flex w-16 shrink-0 items-center gap-1" type="button" onClick={onClick}>
      <ResetIcon aria-hidden="true" className="size-4 text-gray-700" />
      <span className="text-14-22 font-semibold tracking-[-0.2px] text-gray-700">초기화</span>
    </button>
  );
}
