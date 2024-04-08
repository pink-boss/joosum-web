import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { Card } from "./card";
import { PropsWithChildren } from "react";
import { Breakpoint, useBreakpoint } from "@/shared/hook/useBreakpoint";

export const ReviewSwiper = () => {
  const breakpoint = useBreakpoint();
  return (
    <>
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
        >
          <SwiperSlide>
            <ReviewCard>
              <ReviewCardTitle>
                매번 뭐든 저장해놓고
                <br /> 3년동안 안 보던 사람
              </ReviewCardTitle>
              <div>
                <span className="text-[#FFC700] text-[20px]">★★★★★</span>
                <span className="text-[20px] font-bold pl-[4px]">5</span>
              </div>
              <ReviewDescription>
                매번 뭐든 저장해놓고 3년동안 안 보던 사람 .. 의 후기 이런 어플
                어디 없나 항상 생각하고 있었는데 ...! 저의 마음을 읽어버린
                개발자분들 박수드려👏 인스타에서도 항상 저장만 해두고
                꺼내보기까지 시간이 많이 걸렸었는데 이 어플 홈화면에 두니까 너무
                편리하게 꺼내먹을 수 있어서 좋아요 !! (후략)
              </ReviewDescription>
              <span className="w-full inline-block border-t-[1px] border-t-gray-400 pt-3 text-text-80">
                토끼 귀엽
              </span>
            </ReviewCard>
          </SwiperSlide>
          <SwiperSlide>
            <ReviewCard>
              <ReviewCardTitle>
                매번 뭐든 저장해놓고
                <br /> 3년동안 안 보던 사람
              </ReviewCardTitle>
              <div>
                <span className="text-[#FFC700] text-[20px]">★★★★★</span>
                <span className="text-[20px] font-bold pl-[4px]">5</span>
              </div>
              <ReviewDescription>
                매번 뭐든 저장해놓고 3년동안 안 보던 사람 .. 의 후기 이런 어플
                어디 없나 항상 생각하고 있었는데 ...! 저의 마음을 읽어버린
                개발자분들 박수드려👏 인스타에서도 항상 저장만 해두고
                꺼내보기까지 시간이 많이 걸렸었는데 이 어플 홈화면에 두니까 너무
                편리하게 꺼내먹을 수 있어서 좋아요 !! (후략)
              </ReviewDescription>
              <span className="w-full inline-block border-t-[1px] border-t-gray-400 pt-3">
                토끼 귀엽
              </span>
            </ReviewCard>
          </SwiperSlide>
          <SwiperSlide>
            <ReviewCard>
              <ReviewCardTitle>
                모바일에서 저장하고
                <br />
                PC에서 확인하세요
              </ReviewCardTitle>
              <ReviewDescription>
                매번 뭐든 저장해놓고 3년동안 안 보던 사람 .. 의 후기 이런 어플
                어디 없나 항상 생각하고 있었는데 ...! 저의 마음을 읽어버린
                개발자분들 박수드려👏 인스타에서도 항상 저장만 해두고
                꺼내보기까지 시간이 많이 걸렸었는데 이 어플 홈화면에 두니까 너무
                편리하게 꺼내먹을 수 있어서 좋아요 !! (후략)
              </ReviewDescription>
              <span className="w-full inline-block border-t-[1px] border-t-gray-400 pt-3">
                토끼 귀엽
              </span>
            </ReviewCard>
          </SwiperSlide>
          <SwiperSlide>
            <ReviewCard>
              <ReviewCardTitle>
                매번 뭐든 저장해놓고
                <br /> 3년동안 안 보던 사람
              </ReviewCardTitle>
              <div>
                <span className="text-[#FFC700] text-[20px]">★★★★★</span>
                <span className="text-[20px] font-bold pl-[4px]">5</span>
              </div>
              <ReviewDescription>
                어느 기기에서나 편하게 확인해보세요! 스마트폰, 태블릿, PC에서
                저장해뒀던 콘텐츠를 다시 열어볼 수 있어요
              </ReviewDescription>
              <span className="w-full inline-block border-t-[1px] border-t-gray-400 pt-3">
                토끼 귀엽
              </span>
            </ReviewCard>
          </SwiperSlide>
          <SwiperSlide>
            <ReviewCard>
              <ReviewCardTitle>
                매번 뭐든 저장해놓고
                <br /> 3년동안 안 보던 사람
              </ReviewCardTitle>
              <div>
                <span className="text-[#FFC700] text-[20px]">★★★★★</span>
                <span className="text-[20px] font-bold pl-[4px]">5</span>
              </div>
              <ReviewDescription>
                매번 뭐든 저장해놓고 3년동안 안 보던 사람 .. 의 후기 이런 어플
                어디 없나 항상 생각하고 있었는데 ...! 저의 마음을 읽어버린
                개발자분들 박수드려👏 인스타에서도 항상 저장만 해두고
                꺼내보기까지 시간이 많이 걸렸었는데 이 어플 홈화면에 두니까 너무
                편리하게 꺼내먹을 수 있어서 좋아요 !! (후략)
              </ReviewDescription>
              <span className="w-full inline-block border-t-[1px] border-t-gray-400 pt-3">
                토끼 귀엽
              </span>
            </ReviewCard>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

const ReviewCard = ({ children }: PropsWithChildren) => {
  return (
    <Card className="w-[327px] h-[350px] sm:w-[380px] sm:h-[350px]">
      {children}
    </Card>
  );
};

const ReviewCardTitle = ({ children }: PropsWithChildren) => (
  <Card.Title className="text-text-100 leading-[30px] font-semibold">
    {children}
  </Card.Title>
);

const ReviewDescription = ({ children }: PropsWithChildren) => (
  <Card.Description className="pb-6 pt-4 text-80">{children}</Card.Description>
);
