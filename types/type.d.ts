type Value = OptionItem["value"];

type OptionItem<T = Value> = {
  label: string;
  value: T;
};

interface ApiError {
  error: "string";
}
