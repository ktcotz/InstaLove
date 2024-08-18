import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import { ModalStorie } from "./ModalStorie";
import { EffectCreative } from "swiper/modules";
import { Stories } from "../schema/StorieSchema";
import { Dispatch, SetStateAction } from "react";
import { Swiper as SwiperType } from "swiper/types";

type MobileSwiperProps = {
  stories?: Stories;
  setSwiper: Dispatch<SetStateAction<SwiperType | null>>;
};

export const MobileSwiper = ({ stories, setSwiper }: MobileSwiperProps) => {
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
      onSwiper={setSwiper}
    >
      {stories?.map((storie, id) => {
        return (
          <SwiperSlide key={id}>
            <ModalStorie mobile={true} {...storie} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
