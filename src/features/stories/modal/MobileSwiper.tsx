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
  initialSlide: number;
  timer: number;
  handleChangePlaying: () => void;
  resetTimer: () => void;
  isPlaying: boolean;
  changeSlide: (id: number) => void;
};

export const MobileSwiper = ({
  stories,
  setSwiper,
  initialSlide,
  timer,
  resetTimer,
  changeSlide,
  handleChangePlaying,
}: MobileSwiperProps) => {
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
      onSlideChange={(ev) => {
        changeSlide(ev.activeIndex);
        resetTimer();
      }}
    >
      {stories?.map((storie, id) => {
        return (
          <SwiperSlide key={id}>
            <ModalStorie
              mobile={true}
              {...storie}
              active={id === initialSlide}
              handleChangePlaying={handleChangePlaying}
              timer={timer}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
