import useQueryThumbnail from "@/hooks/link/useQueryThumbnail";
import FormItem from "./FormItem";
import { TQueryThumbnail } from "@/types/link.types";
import { useLinkInputStore } from "@/store/useLinkInputStore";

type InputProps = {
  value?: string;
  setValue: (value: string) => void;
  setThumbnail: (values: TQueryThumbnail) => void;
};
export default function LinkInput({
  value,
  setValue,
  setThumbnail,
}: InputProps) {
  const queryThumbnail = useQueryThumbnail();
  const { setIsValid } = useLinkInputStore();

  const handleValidURL = async (input: HTMLInputElement) => {
    const isValidURL = (url: string) => /^https?:\/\/.{3,}$/.test(url);

    if (isValidURL(input.value)) {
      const result = await queryThumbnail.mutateAsync({ url: input.value });
      setThumbnail(result);

      input.setCustomValidity("");
      setIsValid(true);
      const nextInput = document.querySelector<HTMLInputElement>(
        '[data-testid="title"]',
      );
      nextInput?.focus();
    } else {
      input.setCustomValidity("유효한 링크를 입력해주세요.");
      setIsValid(false);
    }
  };

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
        onBlur: (e) => handleValidURL(e.currentTarget),
        onKeyDown: (e) => {
          if ("Enter" === e.key) handleValidURL(e.currentTarget);
        },
      }}
    />
  );
}
