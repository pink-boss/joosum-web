import Folder from "./folder";
import { LinkBooksResponse } from "./type";

type LinkBookListInputProps = LinkBooksResponse & {};

export default function LinkBookList({
  linkBooks,
  totalLinkCount,
}: LinkBookListInputProps) {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-8" role="list">
      <Folder
        linkBook={{
          backgroundColor: "#6D6D6F",
          linkCount: totalLinkCount,
          title: "전체",
          titleColor: "#FFFFFF",
          isDefault: "y",
        }}
      />
      {linkBooks.map((linkBook) => (
        <Folder key={linkBook.linkBookId} linkBook={linkBook} />
      ))}
    </div>
  );
}