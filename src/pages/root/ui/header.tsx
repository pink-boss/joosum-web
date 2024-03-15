import { Logo } from "@/shared/ui/logo";

export const Header = () => {
  return (
    <header className="flex flex-row w-full py-[8px] px-[20px] items-center">
      <Logo />
      <h1 className="text-[24px] font-['PT_Sans_Caption'] font-bold text-primary-500 ml-[8px] leading-[31px]">
        Joosum
      </h1>
      <button className="flex flex-col h-[24px] gap-[3px] w-[24px] mr-0 ml-auto items-center justify-center">
        <span className="sr-only">버튼</span>
        <div className="bg-gray-800 w-[18px] h-[2px]" />
        <div className="bg-gray-800 w-[18px] h-[2px]" />
        <div className="bg-gray-800 w-[18px] h-[2px]" />
      </button>
      <nav className="ml-auto hidden">
        <ul className="flex h-full items-center text-[18px] gap-[20px]">
          <li>
            <a>문의하기</a>
          </li>
          <li>
            <a className="bg-primary-400  text-white p-[12px] rounded-[8px]">
              앱 다운로드 하기
            </a>
          </li>
          <li>
            <a className="bg-primary-500 text-white p-[12px] rounded-[8px]">
              주섬 시작하기
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
