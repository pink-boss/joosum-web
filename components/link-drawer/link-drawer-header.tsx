import Image from 'next/image';

import { ReactNode } from 'react';

interface Props {
  center: ReactNode;
  onClose: () => void;
  right?: ReactNode;
  dataTestId?: string;
}

export default function LinkDrawerHeader({ onClose, center, right = <div />, dataTestId }: Props) {
  return (
    <div className="flex justify-between px-5 py-1">
      <button data-testid={dataTestId} type="button" onClick={onClose}>
        <Image alt="close" height={24} src="/icons/icon-close-outline-black.png" width={24} />
      </button>
      {center}
      {right}
    </div>
  );
}
