'use client';

import Link from 'next/link';

import { ArrowLeftIcon, CheckPurpleIcon } from '@/assets/icons';

interface Props {
  isChecked: boolean;
  label: string;
  link?: string;
  onCheck: () => void;
  dataTestId?: string;
  linkDataTestId?: string;
}

export default function OnboardingAgreementCheckbox(props: Props) {
  const { isChecked, label, link, onCheck, dataTestId, linkDataTestId } = props;

  return (
    <div className="flex items-center justify-between">
      <button
        className="flex cursor-pointer items-center gap-2"
        data-testid={dataTestId}
        type="button"
        onClick={onCheck}
      >
        <div className="flex size-6 items-center justify-center">
          {isChecked && <CheckPurpleIcon className="text-primary-500" height={9} width={12} />}
        </div>
        <span className="text-base text-gray-dim">{label}</span>
      </button>
      {link && (
        <Link
          className="text-gray-400 hover:text-gray-600"
          data-testid={linkDataTestId}
          href={link}
          rel="noopener noreferrer"
          target="_blank"
        >
          <ArrowLeftIcon className="text-inherit" height={24} width={24} />
        </Link>
      )}
    </div>
  );
}
