import Image from 'next/image';

interface Props {
  onClick: () => void;
}

export default function ResetButton({ onClick }: Props) {
  return (
    <button
      className="flex w-16 shrink-0 items-center gap-1 text-sm font-semibold text-gray-dim"
      type="button"
      onClick={onClick}
    >
      <Image alt="reset" height={16} src="/icons/icon-reset.png" width={16} />
      초기화
    </button>
  );
}
