import { useSearchLinkFilterStore } from "@/store/link-filter/useSearchStore";
import { LinkBook } from "@/types/linkBook.types";
import clsx from "clsx";

type InputProps = {
  linkBookList: LinkBook[];
};

export default function LinkBookFilter({ linkBookList = [] }: InputProps) {
  const { linkBookId: selected, setLinkBookId: setSelected } =
    useSearchLinkFilterStore();

  return (
    <div className="scrollbar-hide flex flex-nowrap gap-3 overflow-x-auto">
      <Card
        isSelected={!!selected === false}
        title="전체"
        onClick={() => setSelected("")}
      />
      {linkBookList.map(({ linkBookId, title }) => {
        return (
          <Card
            key={linkBookId}
            isSelected={selected === linkBookId}
            title={title}
            onClick={() => setSelected(linkBookId)}
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
        "h-9 min-w-20 max-w-28 rounded-md px-4 py-1.5",
        "overflow-hidden text-ellipsis whitespace-nowrap font-semibold",
        isSelected && "bg-primary-400 text-white",
        !isSelected && "bg-gray-vapor text-gray-slate",
      )}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
