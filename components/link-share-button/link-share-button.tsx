import { useCallback } from 'react';

import { useDialogStore } from '@/libs/zustand/store';

import { DownloadIcon } from '@/assets/icons';

import { Link } from '@/types/link.types';

interface Props {
  link: Link;
  dataTestId?: string;
}

export default function LinkShareButton({ link, dataTestId }: Props) {
  const { openShareLink } = useDialogStore();

  const handleClick = useCallback(() => {
    openShareLink(true, link.linkId);
  }, [link.linkId, openShareLink]);

  return (
    <button data-testid={dataTestId} type="button" onClick={handleClick}>
      <DownloadIcon aria-hidden="true" className="size-6 text-gray-500" />
    </button>
  );
}
