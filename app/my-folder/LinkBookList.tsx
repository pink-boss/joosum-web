import { TQueryLinkBooks } from "@/types/linkBook.types";

import Folder from "./folder";

type LinkBookListInputProps = TQueryLinkBooks & {};

export default function LinkBookList({
  linkBooks,
  totalLinkCount,
}: LinkBookListInputProps) {
  return (
    <div
      className="flex flex-1 flex-wrap content-start gap-x-6 gap-y-8 overflow-auto"
      role="list"
    >
      <Folder
        linkBook={{
          backgroundColor: "#6D6D6F",
          linkCount: totalLinkCount,
          title: "전체",
          titleColor: "#FFFFFF",
          isDefault: "y",
        }}
      />
      {linkBooks?.map((linkBook) => (
        <Folder key={linkBook.linkBookId} linkBook={linkBook} />
      ))}
    </div>
  );
}
