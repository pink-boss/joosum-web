import FormItem from "./FormItem";
import { ChangeEvent, KeyboardEvent } from "react";

type InputProps = {
  value?: string;
  setValue: (value: string) => void;
  disabled?: boolean;
};
export default function TitleInput({ value, setValue, disabled }: InputProps) {
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValue(value);

    if (value.length < 1) {
      e.target.setCustomValidity("제목은 1 글자 이상 입력해주세요.");
    } else {
      e.target.setCustomValidity("");
    }
  };

  const handlePressEnterKey = (e: KeyboardEvent<HTMLInputElement>) => {
    const isValid = e.currentTarget.checkValidity();

    if (isValid && e.key === "Enter") {
      e.currentTarget.blur();
      const nextInput = document.querySelector<HTMLInputElement>(
        '[data-testid="open-button"]',
      );
      nextInput?.focus();
    }
  };
  return (
    <FormItem
      label="제목"
      name="title"
      value={value}
      setValue={setValue}
      inputProps={{
        placeholder: "제목을 입력해주세요.",
        required: true,
        maxLength: 60,
        onChange: handleChangeValue,
        onKeyDown: handlePressEnterKey,
        disabled: disabled,
      }}
    />
  );
}
