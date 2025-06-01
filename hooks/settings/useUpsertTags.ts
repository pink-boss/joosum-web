import { KeyboardEvent, useRef } from "react";
import { useQueryTagsSetting } from "./useQueryTagsSetting";
import useUpsertTagsSetting from "./useUpsertTagsSetting";

export default function useUpsertTags() {
  const { data } = useQueryTagsSetting();
  const upsertTags = useUpsertTagsSetting();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpsertTags = (newTag: string) => {
    upsertTags.mutate([newTag.trim(), ...(data ?? [])]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleInput = (event: KeyboardEvent<HTMLInputElement>) => {
    const newTag = inputRef.current?.value;

    if (newTag && ["Enter", " "].includes(event.key)) {
      handleUpsertTags(newTag);
    }
  };

  const handleButtonClick = () => {
    const newTag = inputRef.current?.value;
    if (newTag) {
      handleUpsertTags(newTag);
    }
  };

  return { inputRef, handleInput, handleButtonClick, tags: data };
}
