import Image from "next/image";

type InputProps = {
  onClose: () => void;
  linkBookName: string;
};

export default function Header({ onClose, linkBookName }: InputProps) {
  return (
    <div className="flex justify-between px-5 py-1">
      <button onClick={onClose}>
        <Image
          src="icons/icon-close-outline.png"
          alt="close"
          width={24}
          height={24}
        />
      </button>
      <div className="flex items-center gap-1">
        <Image
          src="icons/icon-folder2.png"
          alt="folder"
          width={20}
          height={20}
        />
        <span className="text-text-secondary">{linkBookName}</span>
      </div>
      <button>
        <Image
          src="icons/icon-download2.png"
          alt="download"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
}
