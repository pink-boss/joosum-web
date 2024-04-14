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
      <Section
        color="primary-500"
        className="items-center pt-[107px] sm:px-20 sm:pt-[155px] md:items-start"
      >
        <h1 className="text-white font-extrabold text-[24px] leading-[28px] text-center sm:text-[36px] sm:leading-[42px] md:text-start md:text-[40px] md:leading-[47px]">
          <span className="md:mb-[12px] md:inline-block">
            간편한 링크 아카이빙
          </span>
          <br />
          <span className="text-[32px] leading-[38px] sm:text-[48px] sm:leading-[57px] md:text-[52px] md:leading-[62px]">
            지금 바로 경험하세요!
          </span>
        </h1>
        <Button color="white" className="my-[12px]">
          주섬 시작하기
        </Button>
        <div className="mt-[20px] flex h-[300px] w-[163px] items-center justify-center rounded-[20px] bg-white sm:w-full sm:max-w-[582px] md:hidden">
          모바일 화면
        </div>
      </Section>
      <Section color="white" className="items-start">
        <Section.Title className="ml-6 sm:ml-20">
          <Section.TitleSub>한 눈에 살펴보는 </Section.TitleSub>
          <br className="sm:hidden" />
          <Section.TitleMain className="sm:text-[32px]">
            주섬 사용법
          </Section.TitleMain>
        </Section.Title>
        <UsageSwiper />
      </Section>
      <Section
        color="primary-100"
        className="items-left pb-[48px] sm:px-20 md:flex-row"
      >
        <Section.Title className="mb-4 ml-6">
          <Section.TitleSub className="sm:text-primary-500  sm:font-bold sm:text-[36px] sm:leading-[42px]">
            흩어진 정보들 모두
          </Section.TitleSub>
          <br />
          <Section.TitleMain className="sm:text-[36px] sm:leading-[42px] sm:font-bold">
            한 곳에서 봐요
          </Section.TitleMain>
        </Section.Title>
        <div className="pl-6 sm:max-w-[582px] md:max-w-[774px]">
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
              className="bg-white text-[#555555] rounded-[50px] px-5 py-3 inline-block mr-4 mb-3 text-[16px] font-bold leading-[19px] md:text-[28px] md:py-5 md:px-[27px]"
            >
              {keyword}
            </span>
          ))}
        </div>
      </Section>
      <Section color="white" className="items-center sm:items-start">
        <Section.Title className="mb-5 sm:ml-20">
          <Section.TitleSub className="sm:mr-[10px] sm:text-[36px] sm:font-bold sm:leading-[43px] sm:text-primary-500">
            솔직하고 생생한
          </Section.TitleSub>
          <br className="sm:hidden" />
          <Section.TitleMain className="sm:text-[36px] sm:font-bold sm:leading-[43px]">
            사용자 리뷰
          </Section.TitleMain>
        </Section.Title>
        <ReviewSwiper />
      </Section>
      <Section color="primary-100">
        <Section.Title className="leading-[28px] text-[24px] ml-6 sm:ml-20 sm:text-[36px] sm:leading-[43px]">
          어디서든 링크를 저장하고 <br className="sm:hidden" /> 확인해보세요.
        </Section.Title>
        <p className="mx-6 mt-2 sm:mx-20">
          PC, 태블릿, 모바일 기기 등 하나의 계정으로 연동해서 링크를
          관리해보세요.
        </p>
        <div className="flex w-full px-6 gap-5 mt-5 justify-center sm:hidden">
          <button className="w-[150px] sm:w-[125px]">
            <img src={DownloadIosImage} className="w-full" />
          </button>
          <button className="w-[150px] sm:w-[125px]">
            <img src={DownloadAosImage} className="w-full" />
          </button>
        </div>
        <div>
          <div className="hidden w-[284px] h-[171px] bg-white rounded-[16px] sm:block"></div>
        </div>
      </Section>
      <Footer />
    </div>
  );
};
