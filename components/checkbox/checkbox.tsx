import { InputHTMLAttributes } from 'react';

import clsx from 'clsx';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  dataTestId?: string;
}

export default function Checkbox({ dataTestId, ...props }: Props) {
  return (
    <input
      {...props}
      data-testid={dataTestId}
      type="checkbox"
      className={clsx(
        'size-5 flex-none rounded border border-gray-silver',
        'relative appearance-none checked:after:absolute',
        "checked:bg-primary-500 checked:after:content-['']",
        'checked:after:left-1/2 checked:after:top-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2',
        "checked:after:h-[8.93px] checked:after:w-[9.12px] checked:after:bg-[url('/icons/icon-checkbox-checkmark.png')]",
        props.className && props.className,
      )}
    />
  );
}
