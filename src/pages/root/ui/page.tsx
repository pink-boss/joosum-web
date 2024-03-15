import { Button } from "@/shared/ui/button";
import { Header } from "./header";
import { Section } from "./section";
import { UsageSection } from "./usage-section";
import NotionIconImage from "@/assets/images/icon-notion.svg";
import InstagramIconImage from "@/assets/images/icon-instagram.svg";

export const Page = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <Section color="primary" className="items-center">
        <h2 className="text-primary-500 text-center font-extrabold">
          <span className="text-[24px] leading-[28px]">
            간단한 링크 아카이빙
          </span>
          <br />
          <span className="text-[32px] leading-[38px]">
            지금 바로 경험하세요!
          </span>
        </h2>
        <Button color="primary" className="my-[12px]">
          주섬 시작하기
        </Button>
        <div className="w-[163px] h-[300px] bg-white rounded-[20px] my-[32px] flex items-center justify-center">
          모바일 화면
        </div>
      </Section>
      <UsageSection />
      <Section color="primary" className="items-left">
        <h2 className="mb-4 ml-6">
          <span className="font-medium text-[20px] leading-[23px]">
            흩어진 정보들 모두
          </span>
          <br />
          <span className="font-bold text-[28px] text-primary-500">
            한 곳에서 봐요
          </span>
        </h2>
        <div className="pl-6">
          {[
            "🍜 오사카 맛집",
            "👟 홈트 영상",
            "🎨 디자인 레퍼런스",
            "💰 재테크 공부",
            "📷 Vlog 카메라",
            "✏️  토익 학습자료",
          ].map((keyword) => (
            <span
              key={keyword}
              className="bg-white text-[#555555] rounded-[50px] px-5 py-3 inline-block mr-4 mb-3 text-[16px] font-bold"
            >
              {keyword}
            </span>
          ))}
        </div>
      </Section>
      <Section color="white" className="items-center">
        <h2>
          <span className="font-medium text-[20px] leading-[23px]">
            솔직하고 생생한
          </span>
          <br />
          <span className="font-bold text-[28px] text-primary-500">
            사용자 리뷰
          </span>
        </h2>
        <div className="w-full px-6 text-[#555555]">
          <div className="rounded-[20px] bg-[#F8F9FA] w-full px-5 pt-6 pb-[26px]">
            <span className="text-[#333333] text-[20px] font-semibold">
              매번 뭐든 저장해놓고
              <br /> 3년동안 안 보던 사람
            </span>
            <div>
              <span className="text-[#FFC700] text-[20px]">★★★★★</span>
              <span className="text-[20px] font-bold pl-[4px]">5</span>
            </div>
            <p className="pb-6 pt-4">
              매번 뭐든 저장해놓고 3년동안 안 보던 사람 .. 의 후기 이런 어플
              어디 없나 항상 생각하고 있었는데 ...! 저의 마음을 읽어버린
              개발자분들 박수드려👏 인스타에서도 항상 저장만 해두고 꺼내보기까지
              시간이 많이 걸렸었는데 이 어플 홈화면에 두니까 너무 편리하게
              꺼내먹을 수 있어서 좋아요 !! (후략)
            </p>
            <span className="w-full inline-block border-t-[1px] border-t-gray-400 pt-3">
              토끼 귀엽
            </span>
          </div>
        </div>
      </Section>
      <Section color="primary" className="items-center">
        <h2 className="font-bold text-[28px] text-primary-500 px-6">
          어디서든 링크를 저장하고 확인해보세요.
        </h2>
        <p className="px-6">
          PC, 태블릿, 모바일 기기 등 하나의 계정으로 연동해서 링크를
          관리해보세요.
        </p>
        <div className="flex w-full px-6 gap-5">
          <button className="bg-white w-full">아이폰</button>
          <button className="bg-white w-full">구글</button>
        </div>
      </Section>
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
            <span className="text-[#888888] ml-[17px]">
              pinkjoosum@gmail.com
            </span>
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
    </div>
  );
};
