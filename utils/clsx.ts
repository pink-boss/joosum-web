import { ClassValue, clsx as originalClsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const clsx = (...inputs: ClassValue[]) => {
  return twMerge(originalClsx(...inputs));
};
