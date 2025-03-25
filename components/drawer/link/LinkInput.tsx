import useQueryThumbnail from "@/hooks/link/useQueryThumbnail";
import FormItem from "./FormItem";
import { TQueryThumbnail } from "@/types/link.types";

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

  const onInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    input.setCustomValidity("유효한 링크를 입력해주세요.");
  };

  const onBlur = async () => {
    if (value) {
      const result = await queryThumbnail.mutateAsync({ url: value });
      setThumbnail(result);
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
        onInvalid,
        onBlur,
      }}
    />
  );
}
