import { ChangeEvent, RefObject, useCallback, useState } from 'react';

import FormItem from './link-drawer-form-item';

interface Props {
  disabled?: boolean;
  inputRef?: RefObject<HTMLInputElement>;
  setValue: (value: string) => void;
  value?: string;
}

export default function LinkDrawerTitleInput({ value, setValue, disabled, inputRef }: Props) {
  const [isError, setIsError] = useState(false);

  const handleChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      setValue(value);

      if (value.length < 1) {
        setIsError(true);
      } else {
        setIsError(false);
      }
    },
    [setValue],
  );

  // TODO: 추후 수정
  // const handlePressEnterKey = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
  //   const isValid = e.currentTarget.checkValidity();

  //   if (isValid && e.key === 'Enter') {
  //     e.currentTarget.blur();
  //     const nextInput = document.querySelector<HTMLInputElement>('[data-testid="open-button"]');
  //     nextInput?.focus();
  //   }
  // }, []);

  return (
    <FormItem
      error={{ status: isError, message: '제목은 1 글자 이상 입력해주세요.' }}
      label="제목"
      name="title"
      inputProps={{
        ref: inputRef,
        value: value,
        placeholder: '제목을 입력해주세요.',
        required: true,
        maxLength: 60,
        onChange: handleChangeValue,
        // onKeyDown: handlePressEnterKey,
        disabled: disabled,
      }}
    />
  );
}
