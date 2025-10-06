'use client';

import { InputHTMLAttributes, useId } from 'react';

import clsx from 'clsx';

import { CheckboxCheckmarkIcon } from '@/assets/icons';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  dataTestId?: string;
}

export default function Checkbox({ dataTestId, ...props }: Props) {
  const inputId = useId();

  return props.id ? (
    <>
      <input
        {...props}
        className={clsx('peer sr-only', props.className && props.className)}
        data-testid={dataTestId}
        id={props.id}
        type="checkbox"
      />
      <div className="size-5 flex-none rounded border border-gray-500 peer-checked:hidden" />
      <div className="hidden size-5 flex-none items-center justify-center rounded bg-primary-500 peer-checked:flex">
        <CheckboxCheckmarkIcon aria-hidden="true" className="h-[10.72px] w-[10.94px] text-white" />
      </div>
    </>
  ) : (
    <label htmlFor={inputId}>
      <input
        {...props}
        className={clsx('peer sr-only', props.className && props.className)}
        data-testid={dataTestId}
        id={inputId}
        type="checkbox"
      />
      <div className="size-5 flex-none rounded border border-gray-500 peer-checked:hidden" />
      <div className="hidden size-5 flex-none items-center justify-center rounded bg-primary-500 peer-checked:flex">
        <CheckboxCheckmarkIcon aria-hidden="true" className="h-[10.72px] w-[10.94px] text-white" />
      </div>
    </label>
  );
}
