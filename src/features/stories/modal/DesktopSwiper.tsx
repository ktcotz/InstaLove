import { Swiper, SwiperSlide } from "swiper/react";
import { ModalStorie } from "./ModalStorie";
import { Stories } from "../schema/StorieSchema";
import { Dispatch, SetStateAction } from "react";
import { Swiper as SwiperType } from "swiper/types";
import { NestedSwiper } from "./NestedSwiper";

type DesktopSwiperProps = {
  initialSlide: number;
  changeSlide: (id: number) => void;
  stories?: Stories;
  setSwiper: Dispatch<SetStateAction<SwiperType | null>>;
  handleChangePlaying: () => void;
  isPlaying: boolean;
  timer: number;
  resetTimer: () => void;
  fullStories: Stories;
  setupNestedStories: (length: number) => void;
  nestedStories: number;
  handleSetNextSlide: () => void;
  resetPlaying: () => void;
};

export const DesktopSwiper = ({
  initialSlide,
  changeSlide,
  stories,
  setSwiper,
  handleChangePlaying,
  timer,
  resetTimer,
  fullStories,
  setupNestedStories,
  nestedStories,
  handleSetNextSlide,
  resetPlaying,
}: DesktopSwiperProps) => {
  return (
    <Swiper
      className="modal-stories"
      onSwiper={setSwiper}
      slidesPerView={stories!.length <= 3 ? stories!.length : 3}
      centeredSlides={true}
      initialSlide={initialSlide}
      slideToClickedSlide={true}
      autoHeight={true}
      keyboard={{ enabled: true }}
      onSlideChange={(ev) => {
        changeSlide(ev.clickedIndex || ev.activeIndex);
        resetTimer();
      }}
    >
      {stories?.map((storie, id) => {
        const nested = fullStories.filter(
          (fullStorie) => fullStorie.user_id === storie.user_id
        );
        const active = id === initialSlide;

        return (
          <SwiperSlide key={id} className={`${active ? "modal-active" : ""}`}>
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
