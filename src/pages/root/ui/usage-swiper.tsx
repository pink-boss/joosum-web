import classnames from "classnames";
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import "swiper/css";

import { Card } from "./card";
import { useState, PropsWithChildren } from "react";

export const UsageSwiper = () => {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <>
      <ul className="w-full mt-4 mb-2 ml-6">
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
          slidesPerView={1.2}
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
        "rounded-[50px] py-2 px-3 font-semibold inline-block mr-3 mb-3 leading-[19px]",
      )}
    >
      <button
        onClick={onClick}
        className={classnames(
          active ? "font-bold" : "font-semibold",
          "text-[16px]",
        )}
      >
        {children}
      </button>
    </li>
  );
};
