import clsx from "clsx";
import Image from "next/image";
import { useCallback, useState } from "react";

import useSelectLinkBook from "@/hooks/my-folder/useSelectLinkBook";
import { useClearDropdown } from "@/hooks/useClearDropdown";
import { useOpenDialogStore } from "@/store/useDialogStore";
import { LinkBook } from "@/types/linkBook.types";

type DropdownItemProps = {
  title: string;
  handleClick: () => void;
};

const DropdownItem = ({ title, handleClick }: DropdownItemProps) => {
  return (
    <button
      onClick={handleClick}
      className="w-full px-5 py-1 font-semibold text-gray-black"
    >
      {title}
    </button>
  );
};

type InputProps = {
  linkBook: LinkBook;
  isLayout?: boolean;
};

const DropdownMore = ({ linkBook, isLayout = false }: InputProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const onCloseDropdown = () => setIsOpen(false);

  const ref = useClearDropdown(onCloseDropdown);

  const { openMutateLinkBook, openDeleteLinkBook } = useOpenDialogStore();
  useSelectLinkBook(linkBook.title);

  const closeDialog = () => {
    openMutateLinkBook(false);
    openDeleteLinkBook(false);
  };

  const handleModify = () => {
    closeDialog();
    openMutateLinkBook(true, linkBook.title);
    onCloseDropdown();
  };
  const handleDelete = () => {
    closeDialog();
    openDeleteLinkBook(true, linkBook.title);
    onCloseDropdown();
  };

  const onOpen = useCallback(() => {
    setIsOpen((current) => !current);
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
        className={clsx(
          "flex items-center justify-center rounded-full",
          !isLayout && "size-12 bg-white/80",
          isLayout && "size-5",
        )}
      >
        <Image
          src="/icons/icon-more-vertical.png"
          alt="more"
          width={isLayout ? 20 : 26.4}
          height={isLayout ? 20 : 26.4}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-1 flex w-[110px] flex-col rounded-lg border border-gray-ghost bg-white py-4 shadow-xl">
          <DropdownItem title="폴더 수정" handleClick={handleModify} />
          <DropdownItem title="폴더 삭제" handleClick={handleDelete} />
        </div>
      )}
    </div>
  );
};

export default DropdownMore;
