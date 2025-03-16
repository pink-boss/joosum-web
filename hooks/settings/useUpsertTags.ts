import { KeyboardEvent, useRef } from "react";
import { useQueryTagsSetting } from "./useQueryTagsSetting";
import useUpsertTagsSetting from "./useUpsertTagsSetting";

export default function useUpsertTags() {
  const { data } = useQueryTagsSetting();
  const upsertTags = useUpsertTagsSetting();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (event: KeyboardEvent<HTMLInputElement>) => {
    const newTag = inputRef.current?.value;

    if (newTag && ["Enter", " "].includes(event.key)) {
      upsertTags.mutate([newTag.trim(), ...(data ?? [])]);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return { inputRef, handleInput, tags: data };
}
