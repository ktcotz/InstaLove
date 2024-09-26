import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import { ModalStorie } from "./ModalStorie";
import { EffectCreative } from "swiper/modules";
import { Stories } from "../schema/StorieSchema";
import { Dispatch, SetStateAction } from "react";
import { Swiper as SwiperType } from "swiper/types";
import { NestedSwiper } from "./NestedSwiper";

type MobileSwiperProps = {
  stories?: Stories;
  setSwiper: Dispatch<SetStateAction<SwiperType | null>>;
  initialSlide: number;
  timer: number;
  handleChangePlaying: () => void;
  resetTimer: () => void;
  isPlaying: boolean;
  changeSlide: (id: number) => void;
  fullStories: Stories;
  setupNestedStories: (length: number) => void;
  nestedStories: number;
  handleSetNextSlide: () => void;
  resetPlaying: () => void;
};

export const MobileSwiper = ({
  stories,
  setSwiper,
  initialSlide,
  timer,
  resetTimer,
  changeSlide,
  handleChangePlaying,
  fullStories,
  nestedStories,
  setupNestedStories,
  resetPlaying,
  handleSetNextSlide,
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
        const nested = fullStories.filter(
          (fullStorie) => fullStorie.user_id === storie.user_id
        );
        const active = id === initialSlide;

        return (
          <SwiperSlide key={id}>
            {nested.length >= 2 && active ? (
              <NestedSwiper
                stories={nested}
                timer={timer}
                setupNestedStories={setupNestedStories}
                nestedStories={nestedStories}
                handleSetNextSlide={handleSetNextSlide}
                resetTimer={resetTimer}
                handleChangePlaying={handleChangePlaying}
                resetPlaying={resetPlaying}
              />
            ) : (
              <ModalStorie
                active={active}
                {...storie}
                mobile={true}
                handleChangePlaying={handleChangePlaying}
                timer={timer}
              />
            )}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
