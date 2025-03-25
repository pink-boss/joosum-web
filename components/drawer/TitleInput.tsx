import FormItem from "./link/FormItem";

type InputProps = {
  value?: string;
  setValue: (value: string) => void;
};
export default function LinkInput({ value, setValue }: InputProps) {
  return (
    <FormItem
      label="제목"
      name="title"
      value={value}
      setValue={setValue}
      inputProps={{
        placeholder: "제목을 입력해주세요.",
        required: true,
        type: "url",
        autoFocus: !value,
        maxLength: 60,
      }}
    />
  );
}
