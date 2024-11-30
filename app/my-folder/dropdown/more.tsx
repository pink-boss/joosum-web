import Image from "next/image";
import { useState } from "react";

type DropdownMoreMenuProps = {
  title: string;
  handleClick: () => void;
};

const DropdownMoreMenu = ({ title, handleClick }: DropdownMoreMenuProps) => {
  return (
    <button
      onClick={handleClick}
      className="w-full px-5 py-1 font-semibold text-[#1D1D1D]"
    >
      {title}
    </button>
  );
};

const DropdownMore = () => {
  const [isOpen, setIsOpen] = useState(false);

  // TODO: modal 띄우기
  const handleModify = () => {};
  const handleDelete = () => {};

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-black"
      >
        <Image
          src="/icons/icon-more-vertical.png"
          alt="more"
          width={26.4}
          height={26.4}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 flex w-[110px] flex-col rounded-lg border border-background-secondary bg-white py-4 shadow-lg">
          <DropdownMoreMenu title="폴더 수정" handleClick={handleModify} />
          <DropdownMoreMenu title="폴더 삭제" handleClick={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default DropdownMore;
