import { Swiper, SwiperSlide } from "swiper/react";
import { ModalStorie } from "./ModalStorie";
import { Stories } from "../schema/StorieSchema";

type DesktopSwiperProps = {
  initialSlide: number;
  changeSlide: (id: number) => void;
  stories?: Stories;
};

export const DesktopSwiper = ({
  initialSlide,
  changeSlide,
  stories,
}: DesktopSwiperProps) => {
  console.log(stories);

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
      {stories?.map((storie, id) => {
        return (
          <SwiperSlide
            key={id}
            className={`${id === initialSlide ? "modal-active" : ""}`}
          >
            <ModalStorie active={id === initialSlide} {...storie} />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
