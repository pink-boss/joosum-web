interface Link {
  createdAt: string;
  lastReadAt: string;
  linkBookId: string;
  linkBookName: string;
  linkId: string;
  readCount: number;
  tags: string[];
  thumbnailURL: string;
  title: string;
  updatedAt: string;
  url: string;
  userId: string;
}

interface TQueryLinkBooks {
  linkBooks: LinkBook[];
  totalLinkCount: number;
}

type Value = OptionItem["value"];

type OptionItem<T = Value> = {
  label: string;
  value: T;
};

interface ApiError {
  error: "string";
}
