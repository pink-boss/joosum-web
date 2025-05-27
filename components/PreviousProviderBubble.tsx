type InputProps = {
  children: React.ReactNode;
  isPreviousProvider: boolean;
};

export default function PreviousProviderBubble({
  children,
  isPreviousProvider,
}: InputProps) {
  return (
    <div className="relative flex flex-1 flex-col">
      {children}
      {isPreviousProvider && (
        <div className="absolute left-3/4 top-[51px] z-10 -translate-x-1/2 transform">
          <div className="flex translate-y-[0.5px] justify-center">
            <div className="h-0 w-0 border-b-[12px] border-l-[7px] border-r-[7px] border-b-black border-l-transparent border-r-transparent opacity-80"></div>
          </div>
          <div className="w-64 rounded-full bg-black px-4 py-2 text-center opacity-80">
            <span className="text-white">마지막으로 로그인한 계정이에요</span>
          </div>
        </div>
      )}
    </div>
  );
}
