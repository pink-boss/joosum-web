import { ReactNode } from 'react';

import { CloseOutlineIcon } from '@/assets/icons';

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
        <CloseOutlineIcon aria-hidden="true" className="size-6 text-black" />
      </button>
      {center}
      {right}
    </div>
  );
}
