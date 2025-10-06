import { ForwardedRef, InputHTMLAttributes } from 'react';

import clsx from 'clsx';

import { InputError } from '@/types/form.types';

interface Props {
  error?: InputError;
  inputProps?: InputHTMLAttributes<HTMLInputElement> & {
    ref?: ForwardedRef<HTMLInputElement>;
  };
  label: string;
  name: string;
}

export default function FormItem({ label, name, inputProps, error }: Props) {
  return (
    <div className="flex flex-col text-gray-900">
      <label className="px-2 text-lg font-semibold" htmlFor={name}>
        {label}
      </label>
      <input
        data-testid={name}
        id={name}
        name={name}
        className={clsx(
          'mt-1 h-12 w-full p-3',
          'rounded-lg border border-gray-200 bg-gray-200',
          inputProps?.disabled && 'text-gray-600',
        )}
        {...inputProps}
      />
      {error?.status === true && <div className="mt-0.5 pl-1 text-xs text-error">{error.message}</div>}
    </div>
  );
}
