import { KeyboardEvent, useCallback, useRef, useState } from 'react';

import { Tag } from '@/types/tags.types';

import useGetTagsSetting from './use-get-tags-setting';
import useUpsertTagsSetting from './use-upsert-tags-setting';

interface Props {
  onSuccess?: () => void;
}

export default function useUpsertTags({ onSuccess }: Props) {
  const { data } = useGetTagsSetting();
  const upsertTags = useUpsertTagsSetting({ onSuccess });

  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleUpsertTags = useCallback(
    (newTag: Tag, prevTag?: Tag) => {
      setLoading(true);
      const newTagList = [newTag.trim(), ...(data ?? [])];
      if (prevTag) {
        newTagList.splice(newTagList.indexOf(prevTag), 1);
      }
      upsertTags.mutate(newTagList);
      if (inputRef.current) inputRef.current.value = '';
      setLoading(false);
    },
    [data, upsertTags, inputRef],
  );

  const handleInput = useCallback(
    (event: KeyboardEvent<HTMLInputElement>, prevTag?: Tag) => {
      const newTag = inputRef.current?.value;
      if (newTag && [' ', 'Enter'].includes(event.key)) {
        handleUpsertTags(newTag, prevTag);
      }
    },
    [handleUpsertTags],
  );

  const handleButtonClick = useCallback(() => {
    const newTag = inputRef.current?.value;
    if (newTag) {
      handleUpsertTags(newTag);
    }
  }, [handleUpsertTags]);

  return { inputRef, handleInput, handleButtonClick, tags: data, loading };
}
