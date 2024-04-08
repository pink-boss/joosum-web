import classnames from "classnames";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import "swiper/css";

import { Card } from "./card";
import { useState, PropsWithChildren } from "react";
import { Breakpoint, useBreakpoint } from "@/shared/hook/useBreakpoint";

export const UsageSwiper = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const breakpoint = useBreakpoint();
  return (
    <>
      <ul className="mb-2 ml-6 mt-4 sm:mx-20 sm:mt-[22px]">
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
      <div className="w-full">
        <Swiper
          spaceBetween={0}
          slidesPerView={
            {
              [Breakpoint.BASE]: 1.2,
              [Breakpoint.SM]: 1.9,
            }[breakpoint]
          }
          centeredSlides
          onSwiper={setSwiper}
          onSlideChangeTransitionStart={(swiper) => {
            setActiveIndex(swiper.activeIndex);
          }}
        >
          <SwiperSlide>
            <Card>
              <Card.Title className="text-primary-500">
                모바일에서 저장하고
                <br />
                PC에서 확인하세요
              </Card.Title>
              <Card.Description>
                어느 기기에서나 편하게 확인해보세요! 스마트폰, 태블릿, PC에서
                저장해뒀던 콘텐츠를 다시 열어볼 수 있어요
              </Card.Description>
              <Card.Image />
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
              <Card.Title className="text-primary-500">
                모바일에서 저장하고
                <br />
                PC에서 확인하세요
              </Card.Title>
              <Card.Description>
                어느 기기에서나 편하게 확인해보세요! 스마트폰, 태블릿, PC에서
                저장해뒀던 콘텐츠를 다시 열어볼 수 있어요
              </Card.Description>
              <Card.Image />
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
              <Card.Title className="text-primary-500">
                모바일에서 저장하고
                <br />
                PC에서 확인하세요
              </Card.Title>
              <Card.Description>
                어느 기기에서나 편하게 확인해보세요! 스마트폰, 태블릿, PC에서
                저장해뒀던 콘텐츠를 다시 열어볼 수 있어요
              </Card.Description>
              <Card.Image />
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
              <Card.Title className="text-primary-500">
                모바일에서 저장하고
                <br />
                PC에서 확인하세요
              </Card.Title>
              <Card.Description>
                어느 기기에서나 편하게 확인해보세요! 스마트폰, 태블릿, PC에서
                저장해뒀던 콘텐츠를 다시 열어볼 수 있어요
              </Card.Description>
              <Card.Image />
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card>
              <Card.Title className="text-primary-500">
                모바일에서 저장하고
                <br />
                PC에서 확인하세요
              </Card.Title>
              <Card.Description>
                어느 기기에서나 편하게 확인해보세요! 스마트폰, 태블릿, PC에서
                저장해뒀던 콘텐츠를 다시 열어볼 수 있어요
              </Card.Description>
              <Card.Image />
            </Card>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

const UsageItem = ({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  onClick: () => void;
} & PropsWithChildren) => {
  return (
    <li
      className={classnames(
        active ? "bg-primary-500 text-white" : "bg-gray-200 text-gray-700",
        "mb-3 mr-3 inline-block rounded-[50px] px-3 py-2 font-semibold leading-[19px] sm:px-5 sm:py-3 sm:leading-[24px] sm:mr-6 sm:mb-6",
      )}
    >
      <button
        onClick={onClick}
        className={classnames(
          active ? "font-bold" : "font-semibold",
          "text-[16px] sm:text-[24px]",
        )}
      >
        {children}
      </button>
    </li>
  );
};
