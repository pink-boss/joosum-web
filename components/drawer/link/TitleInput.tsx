import { sendGTMEvent } from "@next/third-parties/google";
import { usePathname } from "next/navigation";
import { ChangeEvent, KeyboardEvent, RefObject, useState } from "react";

import FormItem from "./FormItem";

type InputProps = {
  value?: string;
  setValue: (value: string) => void;
  disabled?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  onClickCallback?: () => void;
};
export default function TitleInput({
  value,
  setValue,
  disabled,
  inputRef,
  onClickCallback,
}: InputProps) {
  const pathname = usePathname();
  const [isError, setIsError] = useState(false);
  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValue(value);

    if (value.length < 1) {
      setIsError(true);
    } else {
      setIsError(false);
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

  const handleClick = () => {
    onClickCallback?.();
  };
  return (
    <FormItem
      label="제목"
      name="title"
      inputProps={{
        ref: inputRef,
        value: value,
        placeholder: "제목을 입력해주세요.",
        required: true,
        maxLength: 60,
        onChange: handleChangeValue,
        onKeyDown: handlePressEnterKey,
        disabled: disabled,
        onClick: handleClick,
      }}
      error={{ status: isError, message: "제목은 1 글자 이상 입력해주세요." }}
    />
  );
}
