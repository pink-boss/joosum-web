"use client";

import Link from "next/link";

interface AgreementCheckboxProps {
  isChecked: boolean;
  label: string;
  link?: string;
  onCheck: () => void;
  onOpenLinkCallback?: () => void;
}

export default function AgreementCheckbox({
  isChecked,
  label,
  link,
  onCheck,
  onOpenLinkCallback,
}: AgreementCheckboxProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex cursor-pointer items-center gap-2" onClick={onCheck}>
        <div className="flex size-6 items-center justify-center">
          {isChecked && (
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path
                d="M1 4.5L4.5 8L11 1.5"
                stroke="#392a95"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        <span className="text-base text-gray-dim">{label}</span>
      </div>
      {link && (
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-600"
          onClick={onOpenLinkCallback}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 18L15 12L9 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}
