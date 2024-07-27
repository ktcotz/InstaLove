import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import { ModalStorie } from "./ModalStorie";
import { EffectCreative } from "swiper/modules";

export const MobileSwiper = () => {
  return (
    <Swiper
      grabCursor={true}
      effect={"creative"}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: [0, 0, -400],
        },
        next: {
          translate: ["100%", 0, 0],
        },
      }}
      modules={[EffectCreative]}
      className="mobile-swiper"
    >
      {Array.from({ length: 15 }).map((_, id) => {
        return (
          <SwiperSlide key={id}>
            <ModalStorie mobile={true} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
