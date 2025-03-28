import useQueryThumbnail from "@/hooks/link/useQueryThumbnail";
import FormItem from "./FormItem";
import { SaveFormState } from "@/types/link.types";
import { useLinkInputStore } from "@/store/useLinkInputStore";
import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from "react";
import { toast } from "@/components/notification/toast";
import { isApiError } from "@/utils/error";

// TODO: 에러 메시지 ui로 변경
type InputProps = {
  value?: string;
  titleInput?: HTMLInputElement | null;
  setFormState: Dispatch<SetStateAction<SaveFormState>>;
};
export default function LinkInput({
  value,
  titleInput,
  setFormState,
}: InputProps) {
  const queryThumbnail = useQueryThumbnail();
  const { setIsValid } = useLinkInputStore();

  const handleValidURL = async (input: HTMLInputElement) => {
    const isValidURL = (url: string) => /^https?:\/\/.{3,}$/.test(url);

    if (isValidURL(input.value)) {
      const result = await queryThumbnail.mutateAsync({ url: input.value });

      if (isApiError(result)) {
        toast({ status: "fail", message: "링크 불러오기를 실패했습니다." });
        return;
      }

      setFormState((prev) => ({
        ...prev,
        ...result,
      }));

      input.setCustomValidity("");
      input.reportValidity();
      setIsValid(true);
      if (titleInput) titleInput.focus();
    } else {
      console.log("실패");
      input.setCustomValidity("유효한 링크를 입력해주세요.");
      input.reportValidity();
      setIsValid(false);
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
        onBlur: (e) => handleValidURL(e.currentTarget),
        onKeyDown: handlePressKey,
        onChange: handleChangeValue,
      }}
    />
  );
}
