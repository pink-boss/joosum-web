import Image from 'next/image';

import { ReactNode } from 'react';

import clsx from 'clsx';

import { CreateFolder } from '@/types/folder.types';

const TITLE_PLACEHOLDER = '폴더명을 입력해주세요.';

interface Props extends Partial<CreateFolder> {
  children?: ReactNode;
  isPreview?: boolean;
}

// 폴더 UI 컴포넌트
export default function Folder(props: Props) {
  const {
    backgroundColor,
    illustration,
    title = '폴더명을 입력해주세요.',
    titleColor,
    children,
    isPreview = false,
  } = props;

  return (
    <div
      style={{ backgroundColor }}
      className={clsx(
        'relative flex flex-col justify-between shadow',
        isPreview ? 'h-44 w-32.5 rounded-lg' : 'w-full flex-1 rounded-xl',
      )}
    >
      <div
        className={clsx(
          'absolute h-full bg-black opacity-10',
          isPreview ? 'left-2.25 w-0.5' : 'left-[13.2px] w-[3.3px]',
        )}
      />
      <div
        className={clsx('font-bold', isPreview ? 'ml-5.5 mt-4 w-23.5 text-sm' : 'ml-8.25 mt-[19.8px] w-30.25 text-lg')}
        style={{ color: titleColor }}
      >
        {title || (isPreview && TITLE_PLACEHOLDER)}
      </div>
      {illustration && (
        <div className={clsx(isPreview ? 'mb-4 ml-8.5' : 'mb-[13.2px] ml-[41.66px]')}>
          <Image
            alt={illustration}
            height={isPreview ? 80 : 118.8}
            src={`/images/${illustration}.png`}
            width={isPreview ? 80 : 118.8}
          />
        </div>
      )}
      {children}
    </div>
  );
}
