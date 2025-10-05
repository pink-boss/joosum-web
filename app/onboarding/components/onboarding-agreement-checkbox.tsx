'use client';

import Link from 'next/link';

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
          {isChecked && (
            <svg fill="none" height="9" viewBox="0 0 12 9" width="12">
              <path
                d="M1 4.5L4.5 8L11 1.5"
                stroke="#392a95"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          )}
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
          <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}
