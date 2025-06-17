import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from "react";

import { toast } from "@/components/notification/toast";
import useQueryThumbnail from "@/hooks/link/useQueryThumbnail";
import { SaveFormState } from "@/types/link.types";
import { isApiError } from "@/utils/error";

import FormItem from "./FormItem";

type InputProps = {
  value?: string;
  titleInput?: HTMLInputElement | null;
  setFormState: Dispatch<SetStateAction<SaveFormState>>;
  disabled?: boolean;
};
export default function LinkInput({
  value,
  titleInput,
  setFormState,
  disabled,
}: InputProps) {
  const queryThumbnail = useQueryThumbnail();
  const [isError, setIsError] = useState(false);

  const handleValidURL = async (input: HTMLInputElement) => {
    setFormState((prev) => ({
      ...prev,
      url: input.value,
    }));

    const isValidURL = (url: string) => {
      if (!url) return false;
      return /^(?:https?:\/\/)?.{3,}$/.test(url);
    };

    if (isValidURL(input.value)) {
      const result = await queryThumbnail.mutateAsync({ url: input.value });

      console.log("result", result);
      if (isApiError(result)) {
        toast({ status: "fail", message: "링크 불러오기를 실패했습니다." });
        return;
      }

      setFormState((prev) => ({
        ...prev,
        thumbnailURL: result.thumbnailURL,
      }));

      setIsError(false);
      if (titleInput) titleInput.focus();
    } else {
      setIsError(true);
    }
  };

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({
      ...prev,
      url: e?.target?.value,
      title: "",
    }));
  };

  const handlePressKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if ("Enter" === e.key) {
      e.preventDefault();
      handleValidURL(e.currentTarget);
    }
  };
  return (
    <FormItem
      label="링크"
      name="url"
      inputProps={{
        value: value,
        placeholder: "URL을 입력하거나 붙여넣어주세요.",
        required: true,
        type: "url",
        autoFocus: !value,
        disabled: disabled,
        onBlur: (e) => handleValidURL(e.currentTarget),
        onKeyDown: handlePressKey,
        onChange: handleChangeValue,
      }}
      error={{ status: isError, message: "유효한 링크를 입력해주세요." }}
    />
  );
}
