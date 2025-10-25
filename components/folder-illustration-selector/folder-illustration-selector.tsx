import Image from 'next/image';

import { useCallback, useMemo } from 'react';

import clsx from 'clsx';

interface Props {
  illustration?: null | string;
  illustrationIndex: number;
  previewIllustration?: null | string;
  setPreviewIllustration: (name: string, value: null | string | undefined) => void;
  stateName: string;
}

// 폴더 일러스트 선택
export default function FolderIllustrationSelector(props: Props) {
  const { illustration, previewIllustration, setPreviewIllustration, stateName } = props;

  const handleClick = useCallback(() => {
    setPreviewIllustration(stateName, illustration);
  }, [setPreviewIllustration, stateName, illustration]);

  const isSelected = useMemo(
    () => previewIllustration == illustration || (isEmpty(previewIllustration) && isEmpty(illustration)),
    [previewIllustration, illustration],
  );

  return (
    <button
      className={clsx('relative size-20 rounded-lg bg-gray-300')}
      data-testid="select_folderIllust_addFolder"
      type="button"
      onClick={handleClick}
    >
      {isSelected && <div className="absolute size-full rounded-lg bg-primary-500 opacity-20"></div>}
      <div className={clsx('flex size-full items-center justify-center rounded-lg border')}>
        {illustration ? (
          <Image alt={illustration} height={54.34} src={`/images/${illustration}.png`} width={54.34} />
        ) : (
          <div className="text-sm text-gray-700">선택 안함</div>
        )}
      </div>
    </button>
  );
}

const isEmpty = (illustration: null | string | undefined) => {
  return illustration === '' || illustration === undefined || illustration === null;
};
