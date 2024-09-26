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
              <NestedSwiper stories={nested} />
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
