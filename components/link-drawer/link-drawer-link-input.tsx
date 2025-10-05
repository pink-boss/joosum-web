import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useCallback } from 'react';

import { useGetLinkThumbnail } from '@/services/link';

import { isApiError } from '@/utils/error';
import { toast } from '@/utils/toast';

import { SaveFormState } from '@/types/link.types';

import FormItem from './link-drawer-form-item';

interface Props {
  disabled?: boolean;
  onClickCallback?: () => void;
  setFormState: Dispatch<SetStateAction<SaveFormState>>;
  titleInput?: HTMLInputElement | null;
  value?: string;
}

export default function LinkDrawerLinkInput({ value, titleInput, setFormState, disabled, onClickCallback }: Props) {
  const queryThumbnail = useGetLinkThumbnail();
  // const [isError, setIsError] = useState(false);

  const handleValidURL = useCallback(
    async (input: HTMLInputElement) => {
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

        if (isApiError(result)) {
          toast({ status: 'fail', message: '링크 불러오기를 실패했습니다.' });
          return;
        }

        setFormState((prev) => ({
          ...prev,
          thumbnailURL: result?.thumbnailURL,
          title: result?.title,
          url: result?.url,
        }));

        // setIsError(false);
        if (titleInput) titleInput.focus();
      } else {
        // setIsError(true);
      }
    },
    [queryThumbnail, setFormState, titleInput],
  );

  const handleChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({
        ...prev,
        url: e?.target?.value,
        title: '',
      }));
    },
    [setFormState],
  );

  const handlePressKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if ('Enter' === e.key) {
        e.preventDefault();
        handleValidURL(e.currentTarget);
      }
    },
    [handleValidURL],
  );

  return (
    <FormItem
      label="링크"
      name="url"
      inputProps={{
        value: value,
        placeholder: 'URL을 입력하거나 붙여넣어주세요.',
        required: true,
        autoFocus: !value,
        disabled: disabled,
        onBlur: (e) => handleValidURL(e.currentTarget),
        onKeyDown: handlePressKey,
        onChange: handleChangeValue,
        onClick: onClickCallback,
      }}
      // error={{ status: isError, message: "유효한 링크를 입력해주세요." }}
    />
  );
}
