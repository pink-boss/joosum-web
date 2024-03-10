import { Logo } from "@/shared/ui/logo";

export const Page = () => {
  return (
    <div className="flex flex-col">
      <header className="flex flex-row w-full py-[12px] px-[12px]">
        <Logo />
        <h1 className="text-[32px] font-['PT_Sans_Caption'] font-bold text-primary-500">
          Joosum
        </h1>
        <nav className="ml-auto">
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
      <section className="flex flex-col items-center bg-primary-200 py-[100px]">
        <h2 className="text-primary-500 text-[40px] text-center font-extrabold leading-[50px]">
          간단한 링크 아카이빙
          <br />
          <span className="text-[52px]">지금 바로 경험하세요!</span>
        </h2>
        <button className="bg-primary-500 text-white rounded-[12px] py-[22.5px] px-[49px] w-fit text-[28px] mt-[20px] mb-[40px] font-['Pretendard_Regular'] font-bold">
          주섬 시작하기
        </button>
        <div className="w-[432px] h-[347px] bg-white rounded-[20px]"></div>
      </section>
    </div>
  );
};
