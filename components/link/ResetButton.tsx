import Image from "next/image";

type InputProps = {
  handleClick: () => void;
};

export default function ResetButton({ handleClick }: InputProps) {
  return (
    <button
      className="flex w-16 shrink-0 items-center gap-1 text-sm font-semibold text-gray-dim"
      onClick={handleClick}
    >
      <Image src="/icons/reset.png" alt="reset" width={16} height={16} />
      초기화
    </button>
  );
}
