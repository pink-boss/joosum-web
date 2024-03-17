import { Button } from "@/shared/ui/button";
import { Header } from "./header";
import { Section } from "./section";
import { UsageSwiper } from "./usage-swiper";
import { ReviewSwiper } from "./review-swiper";
import { Footer } from "./footer";
import DownloadIosImage from "@/assets/images/download-ios.svg";
import DownloadAosImage from "@/assets/images/download-aos.svg";

export const Page = () => {
  return (
    <div className="flex flex-col">
      <Header />
      <Section color="primary-500" className="items-center">
        <Section.Title className="text-center font-extrabold">
          <Section.TitleSub className="text-[24px] leading-[28px] text-white">
            한 눈에 살펴보는
          </Section.TitleSub>
          <Section.TitleMain className="text-[32px] leading-[38px] text-white">
            지금 바로 경험하세요!
          </Section.TitleMain>
        </Section.Title>
        <Button color="white" className="my-[12px]">
          주섬 시작하기
        </Button>
        <div className="w-[163px] h-[300px] bg-white rounded-[20px] m-[20px] flex items-center justify-center">
          모바일 화면
        </div>
      </Section>
      <Section color="white" className="items-start">
        <Section.Title className="ml-6">
          <Section.TitleSub>한 눈에 살펴보는</Section.TitleSub>
          <Section.TitleMain>주섬 사용법</Section.TitleMain>
        </Section.Title>
        <UsageSwiper />
      </Section>
      <Section color="primary-100" className="items-left pb-[48px]">
        <Section.Title className="mb-4 ml-6">
          <Section.TitleSub>흩어진 정보들 모두</Section.TitleSub>
          <Section.TitleMain>한 곳에서 봐요</Section.TitleMain>
        </Section.Title>
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
              className="bg-white text-[#555555] rounded-[50px] px-5 py-3 inline-block mr-4 mb-3 text-[16px] font-bold leading-[19px]"
            >
              {keyword}
            </span>
          ))}
        </div>
      </Section>
      <Section color="white" className="items-center">
        <Section.Title className="mb-5">
          <Section.TitleSub>솔직하고 생생한</Section.TitleSub>
          <Section.TitleMain>사용자 리뷰</Section.TitleMain>
        </Section.Title>
        <ReviewSwiper />
      </Section>
      <Section color="primary-100">
        <Section.Title className="leading-[28px] text-[24px] pl-6">
          어디서든 링크를 저장하고 <br /> 확인해보세요.
        </Section.Title>
        <p className="px-6 mt-2">
          PC, 태블릿, 모바일 기기 등 하나의 계정으로 연동해서 링크를
          관리해보세요.
        </p>
        <div className="flex w-full px-6 gap-5 mt-5">
          <button className="w-full">
            <img src={DownloadIosImage} className="w-full" />
          </button>
          <button className="w-full">
            <img src={DownloadAosImage} className="w-full" />
          </button>
        </div>
      </Section>
      <Footer />
    </div>
  );
};
