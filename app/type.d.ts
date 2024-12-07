interface TQueryLinkBooks {
  linkBooks: LinkBook[];
  totalLinkCount: number;
}

type Value = OptionItem["value"];

type OptionItem = {
  label: string;
  value: Value;
};
