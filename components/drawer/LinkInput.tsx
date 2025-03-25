import FormItem from "./link/FormItem";

type InputProps = {
  value?: string;
  setValue: (value: string) => void;
};
export default function LinkInput({ value, setValue }: InputProps) {
  return (
    <FormItem
      label="링크"
      name="url"
      value={value}
      setValue={setValue}
      inputProps={{
        placeholder: "URL을 입력하거나 붙여넣어주세요.",
        required: true,
        type: "url",
        autoFocus: !value,
      }}
    />
  );
}
