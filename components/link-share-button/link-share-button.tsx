import Image from 'next/image';

import { useCallback } from 'react';

import { useDialogStore } from '@/libs/zustand/store';

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
      <Image alt="share" height={24} src="/icons/icon-download2.png" width={24} />
    </button>
  );
}
