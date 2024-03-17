import NotionIconImage from "@/assets/images/icon-notion.svg";
import InstagramIconImage from "@/assets/images/icon-instagram.svg";

export const Footer = () => {
  return (
    <footer className="w-full">
      <nav className="py-3 border-b border-b-[#EBEBEB]">
        <ul className="flex flex-row w-full justify-between items-center">
          <span className="border-r border-r-[#EBEBEB] basis-1/4 px-4 text-center">
            개인정보 처리방침
          </span>
          <span className="border-r border-r-[#EBEBEB] basis-1/4  px-4 text-center">
            서비스
            <br />
            이용약관
          </span>
          <span className="border-r border-r-[#EBEBEB] basis-1/4  px-4 text-center">
            이용문의
          </span>
          <span className="basis-1/4 text-center">공지사항</span>
        </ul>
      </nav>

      <div className="px-6 py-[30px] flex w-full flex-col">
        <span className="text-black font-semibold">Pinkboss</span>
        <span className="text-[#808080] text-[12px] font-normal">
          Copyright ⓒ 2022, Pinkboss. All rights reserved.
        </span>
        <div className="mt-5">
          <span className="text-black font-semibold">Contact:</span>
          <span className="text-[#888888] ml-[17px]">pinkjoosum@gmail.com</span>
        </div>
        <div className="flex w-full flex-row justify-end gap-[21px] h-[32px] items-center">
          <a>
            <img src={NotionIconImage} alt="주섬 노션" />
          </a>
          <a>
            <img src={InstagramIconImage} alt="주섬 인스타그램" />
          </a>
        </div>
      </div>
    </footer>
  );
};
