import FormItem from "./FormItem";

type InputProps = {
  value?: string;
  setValue: (value: string) => void;
};
export default function TitleInput({ value, setValue }: InputProps) {
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
        onInvalid: (e: React.FormEvent<HTMLInputElement>) => {
          const input = e.target as HTMLInputElement;
          input.setCustomValidity("제목은 1 글자 이상 입력해주세요.");
        },
      }}
    />
  );
}
