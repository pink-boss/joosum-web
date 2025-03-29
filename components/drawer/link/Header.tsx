import Image from "next/image";

type InputProps = {
  onClose: () => void;

  center: React.ReactNode;
  right?: React.ReactNode;
};

export default function Header({
  onClose,

  center,
  right = <div />,
}: InputProps) {
  return (
    <div className="flex justify-between px-5 py-1">
      <button onClick={onClose}>
        <Image
          src="/icons/icon-close-outline-black.png"
          alt="close"
          width={24}
          height={24}
        />
      </button>
      {center}
      {right}
    </div>
  );
}
