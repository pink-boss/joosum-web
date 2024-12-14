import { useClearDropdown } from "@/hooks/useClearDropdown";
import { useOpenDialogStore } from "@/store/useDialogStore";
import Image from "next/image";
import { useCallback, useState } from "react";
import { LinkBook } from "@/types/linkBook.types";
import useSelectLinkBook from "@/hooks/my-folder/useSelectLinkBook";

type DropdownItemProps = {
  title: string;
  handleClick: () => void;
};

const DropdownItem = ({ title, handleClick }: DropdownItemProps) => {
  return (
    <button
      onClick={handleClick}
      className="w-full px-5 py-1 font-semibold text-[#1D1D1D]"
    >
      {title}
    </button>
  );
};

type InputProps = {
  linkBook: LinkBook;
};

const DropdownMore = ({ linkBook }: InputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  const ref = useClearDropdown(onClose);

  const { openMutateLinkBook, openDeleteLinkBook } = useOpenDialogStore();
  useSelectLinkBook(linkBook.title);

  const handleModify = () => {
    openMutateLinkBook(true, linkBook.title);
    onClose();
  };
  const handleDelete = () => {
    openDeleteLinkBook(true, linkBook.title);
    onClose();
  };

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  return (
    <div
      className="relative"
      data-testid="link-book-more"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <button
        onClick={onOpen}
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
        <div className="absolute z-20 mt-1 flex w-[110px] flex-col rounded-lg border border-background-secondary bg-white py-4 shadow-lg">
          <DropdownItem title="폴더 수정" handleClick={handleModify} />
          <DropdownItem title="폴더 삭제" handleClick={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default DropdownMore;
