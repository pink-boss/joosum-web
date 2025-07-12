import clsx from "clsx";

import useQueryLinkBooks from "@/hooks/my-folder/useQueryLinkBooks";
import { useSearchLinkFilterStore } from "@/store/link-filter/useSearchStore";
import { useSearchLinkSortStore } from "@/store/link-sort/useSearchStore";
import { LinkBook } from "@/types/linkBook.types";

export default function LinkBookFilter() {
  const linkSort = useSearchLinkSortStore();
  const { isPending, error, data } = useQueryLinkBooks(linkSort.sort);
  const linkBooks = data?.linkBooks ?? [];

  const { linkBookId: selected, setLinkBookId: setSelected } =
    useSearchLinkFilterStore();

  return (
    <div className="scrollbar-hide flex gap-3 overflow-x-auto">
      <Card
        isSelected={!!selected === false}
        title="전체"
        onClick={() => setSelected("")}
      />
      {linkBooks.map((_linkBook) => {
        return (
          <Card
            key={_linkBook.linkBookId}
            isSelected={selected === _linkBook.linkBookId}
            title={_linkBook.title}
            onClick={() => setSelected(_linkBook.linkBookId)}
          />
        );
      })}
    </div>
  );
}

type CardInputProps = Pick<LinkBook, "title"> & {
  isSelected: boolean;
  onClick: () => void;
};

export function Card({ isSelected, title, onClick }: CardInputProps) {
  return (
    <button
      type="button"
      className={clsx(
        "h-9 flex-none rounded-md px-4 py-1.5",
        "whitespace-nowrap font-semibold",
        isSelected && "bg-primary-400 text-white hover:bg-primary-500",
        !isSelected && "bg-gray-vapor text-gray-slate hover:bg-gray-ghost",
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
