import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import "swiper/css";

import { Section } from "./section";
import { UsageItem } from "./usage-item";
import { UsageCard } from "./usage-card";
import { useState } from "react";

export const UsageSection = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Section color="white" className="items-start">
      <div className=" pl-6">
        <h2>
          <span className="font-medium text-[20px] leading-[23px]">
            한 눈에 살펴보는
          </span>
          <br />
          <span className="font-bold text-[28px] text-primary-500">
            주섬 사용법
          </span>
        </h2>
        <ul className="w-full">
          {[
            "쉬운 확인",
            "어디서든 확인",
            "나만의 폴더",
            "태그로 구분",
            "잊지 않게 알림",
          ].map((title, index) => {
            const active = activeIndex === index;
            return (
              <UsageItem
                key={title}
                active={active}
                onClick={() => swiper?.slideTo(index)}
              >
                {title}
              </UsageItem>
            );
          })}
        </ul>
      </div>
      <div className="w-full">
        <Swiper
          slidesPerView={1.15}
          centeredSlides
          onSwiper={setSwiper}
          onSlideChangeTransitionStart={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
        >
          <SwiperSlide>
            <UsageCard>
              <UsageCard.Title>
                모바일에서 저장하고
                <br />
                PC에서 확인하세요
              </UsageCard.Title>
              <UsageCard.Description>
                어느 기기에서나 편하게 확인해보세요! 스마트폰, 태블릿, PC에서
                저장해뒀던 콘텐츠를 다시 열어볼 수 있어요
              </UsageCard.Description>
              <UsageCard.Image />
            </UsageCard>
          </SwiperSlide>
          <SwiperSlide>
            <UsageCard>
              <UsageCard.Title>
                모바일에서 저장하고
                <br />
                PC에서 확인하세요
              </UsageCard.Title>
              <UsageCard.Description>
                어느 기기에서나 편하게 확인해보세요! 스마트폰, 태블릿, PC에서
                저장해뒀던 콘텐츠를 다시 열어볼 수 있어요
              </UsageCard.Description>
              <UsageCard.Image />
            </UsageCard>
          </SwiperSlide>
          <SwiperSlide>
            <UsageCard>
              <UsageCard.Title>
                모바일에서 저장하고
                <br />
                PC에서 확인하세요
              </UsageCard.Title>
              <UsageCard.Description>
                어느 기기에서나 편하게 확인해보세요! 스마트폰, 태블릿, PC에서
                저장해뒀던 콘텐츠를 다시 열어볼 수 있어요
              </UsageCard.Description>
              <UsageCard.Image />
            </UsageCard>
          </SwiperSlide>
          <SwiperSlide>
            <UsageCard>
              <UsageCard.Title>
                모바일에서 저장하고
                <br />
                PC에서 확인하세요
              </UsageCard.Title>
              <UsageCard.Description>
                어느 기기에서나 편하게 확인해보세요! 스마트폰, 태블릿, PC에서
                저장해뒀던 콘텐츠를 다시 열어볼 수 있어요
              </UsageCard.Description>
              <UsageCard.Image />
            </UsageCard>
          </SwiperSlide>
          <SwiperSlide>
            <UsageCard>
              <UsageCard.Title>
                모바일에서 저장하고
                <br />
                PC에서 확인하세요
              </UsageCard.Title>
              <UsageCard.Description>
                어느 기기에서나 편하게 확인해보세요! 스마트폰, 태블릿, PC에서
                저장해뒀던 콘텐츠를 다시 열어볼 수 있어요
              </UsageCard.Description>
              <UsageCard.Image />
            </UsageCard>
          </SwiperSlide>
        </Swiper>
      </div>
    </Section>
  );
};
