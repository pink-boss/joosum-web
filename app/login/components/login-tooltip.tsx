import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isPreviousProvider: boolean;
}

export default function LoginTooltip({ children, isPreviousProvider }: Props) {
  return (
    <div className="relative flex flex-1 flex-col">
      {children}
      {isPreviousProvider && (
        <div className="absolute left-1/2 top-12.75 z-10 -translate-x-1/2">
          <div className="flex translate-y-[0.5px] justify-center">
            <div className="size-0 border-x-7 border-b-12 border-x-transparent border-b-black/80"></div>
          </div>
          <div className="w-64 rounded-full bg-black/80 px-4 py-2 text-center">
            <span className="text-16-24 font-semibold tracking-[-0.2px] text-white">
              마지막으로 로그인한 계정이에요
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
