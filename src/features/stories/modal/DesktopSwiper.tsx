import { Swiper, SwiperSlide } from "swiper/react";
import { ModalStorie } from "./ModalStorie";

type DesktopSwiperProps = {
  initialSlide: number;
  changeSlide: (id: number) => void;
};

export const DesktopSwiper = ({
  initialSlide,
  changeSlide,
}: DesktopSwiperProps) => {
  return (
    <Swiper
      className="modal-stories"
      slidesPerView={3}
      centeredSlides={true}
      initialSlide={initialSlide}
      slideToClickedSlide={true}
      noSwiping={true}
      autoHeight={true}
      breakpoints={{
        1300: {
          slidesPerView: 4,
        },
      }}
      onSlideChange={(ev) => {
        changeSlide(ev.clickedIndex);
      }}
    >
      {Array.from({ length: 15 }).map((_, id) => {
        return (
          <SwiperSlide
            key={id}
            className={`${id === initialSlide ? "modal-active" : ""}`}
          >
            <ModalStorie active={id === initialSlide} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};