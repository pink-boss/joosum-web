import Image from 'next/image';

import { useCallback, useMemo } from 'react';

import clsx from 'clsx';

interface Props {
  color: string;
  colorIndex: number;
  previewColor?: string;
  setPreviewColor: (name: string, value: string) => void;
  stateName: string;
}

const WHITE_COLOR = '#FFFFFF';

// 폴더 색상 선택
export default function FolderColorSelector({ color, previewColor, setPreviewColor, stateName }: Props) {
  const handleClick = useCallback(() => {
    setPreviewColor(stateName, color);
  }, [setPreviewColor, stateName, color]);

  const { isSelected, isBrightColor, isWhiteColor } = useMemo(() => {
    const isSelected = previewColor && previewColor === color;
    const isBrightColor = ['#F6F6F6', WHITE_COLOR].includes(color);
    const isWhiteColor = color === WHITE_COLOR;

    return { isSelected, isBrightColor, isWhiteColor };
  }, [color, previewColor]);

  return (
    <button
      className={clsx('size-12 rounded-lg border', isSelected && 'p-0')}
      data-testid="select_folderColor_addFolder"
      style={{ backgroundColor: color, borderColor: color }}
      type="button"
      onClick={handleClick}
    >
      <div
        className={clsx(
          'flex size-full items-center justify-center rounded-lg border',
          isBrightColor ? 'border-black' : 'border-white',
          isSelected ? 'block' : isWhiteColor ? 'block [&>img]:hidden' : 'hidden',
        )}
      >
        <Image
          alt="check"
          className={clsx('brightness-100', isBrightColor && 'invert')}
          height={8.31}
          src="/images/check.png"
          width={12.47}
        />
      </div>
    </button>
  );
}
