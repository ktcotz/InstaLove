import { Swiper, SwiperSlide } from "swiper/react";
import { ModalStorie } from "./ModalStorie";
import { Stories } from "../schema/StorieSchema";
import { Dispatch, SetStateAction } from "react";
import { Swiper as SwiperType } from "swiper/types";

type DesktopSwiperProps = {
  initialSlide: number;
  changeSlide: (id: number) => void;
  stories?: Stories;
  setSwiper: Dispatch<SetStateAction<SwiperType | null>>;
  handleChangePlaying: () => void;
  isPlaying: boolean;
  timer: number;
  resetTimer: () => void;
};

export const DesktopSwiper = ({
  initialSlide,
  changeSlide,
  stories,
  setSwiper,
  handleChangePlaying,
  timer,
  resetTimer,
}: DesktopSwiperProps) => {
  return (
    <Swiper
      className="modal-stories"
      onSwiper={setSwiper}
      slidesPerView={3}
      centeredSlides={true}
      initialSlide={initialSlide}
      slideToClickedSlide={true}
      autoHeight={true}
      keyboard={{ enabled: true }}
      breakpoints={{
        1300: {
          slidesPerView: 4,
        },
      }}
      onSlideChange={(ev) => {
        changeSlide(ev.clickedIndex);
        resetTimer();
      }}
    >
      {stories?.map((storie, id) => {
        return (
          <SwiperSlide
            key={id}
            className={`${id === initialSlide ? "modal-active" : ""}`}
          >
            <ModalStorie
              active={id === initialSlide}
              {...storie}
              handleChangePlaying={handleChangePlaying}
              timer={timer}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
