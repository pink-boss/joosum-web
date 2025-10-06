'use client';

import Link from 'next/link';

import clsx from 'clsx';

import { CheckmarkIcon, ChevronRightIcon } from '@/assets/icons';

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
        <CheckmarkIcon
          aria-hidden="true"
          className={clsx('size-6', isChecked ? 'text-primary-500' : 'text-gray-500')}
        />
        <span className="text-base text-gray-700">{label}</span>
      </button>
      {link && (
        <Link
          className="text-gray-500 hover:text-gray-600"
          data-testid={linkDataTestId}
          href={link}
          rel="noopener noreferrer"
          target="_blank"
        >
          <ChevronRightIcon aria-hidden="true" className="size-6 text-inherit" />
        </Link>
      )}
    </div>
  );
}
