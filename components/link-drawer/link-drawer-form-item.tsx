import { ForwardedRef, InputHTMLAttributes } from 'react';

import { clsx } from '@/utils/clsx';

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
    <div className="flex flex-col">
      <label className="px-1 text-18-26 font-semibold tracking-[-0.2px] text-black" htmlFor={name}>
        {label}
      </label>
      <input
        {...inputProps}
        data-testid={name}
        id={name}
        name={name}
        className={clsx(
          'mt-2 h-12 w-full rounded-lg border border-gray-200 bg-gray-200 p-2.75 text-16-24 font-normal tracking-[-0.2px] text-gray-900 placeholder:text-gray-600 focus:border-primary-500 focus:bg-primary-100 focus:font-semibold focus:placeholder:font-normal focus:placeholder:text-gray-900',
          inputProps?.disabled && 'text-gray-600',
        )}
      />
      {error?.status === true && (
        <span className="mt-0.5 pl-1 text-12-20 tracking-[-0.2px] text-error">{error.message}</span>
      )}
    </div>
  );
}
