import { KeyboardEvent, useRef, useState } from "react";
import { useQueryTagsSetting } from "./useQueryTagsSetting";
import useUpsertTagsSetting from "./useUpsertTagsSetting";
import { Tag } from "@/types/tags.types";

export default function useUpsertTags(onSuccess?: () => void) {
  const [loading, setLoading] = useState(false);
  const { data } = useQueryTagsSetting();
  const upsertTags = useUpsertTagsSetting(onSuccess);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpsertTags = (newTag: Tag, prevTag?: Tag) => {
    setLoading(true);

    const newTagList = [newTag.trim(), ...(data ?? [])];
    if (prevTag) {
      newTagList.splice(newTagList.indexOf(prevTag), 1);
    }

    upsertTags.mutate(newTagList);
    if (inputRef.current) inputRef.current.value = "";
    setLoading(false);
  };

  const handleInput = (
    event: KeyboardEvent<HTMLInputElement>,
    prevTag?: Tag,
  ) => {
    const newTag = inputRef.current?.value;

    if (newTag && ["Enter", " "].includes(event.key)) {
      handleUpsertTags(newTag, prevTag);
    }
  };

  const handleButtonClick = () => {
    const newTag = inputRef.current?.value;
    if (newTag) {
      handleUpsertTags(newTag);
    }
  };

  return { inputRef, handleInput, handleButtonClick, tags: data, loading };
}
