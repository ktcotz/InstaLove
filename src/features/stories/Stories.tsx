import { Storie } from "./Storie";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { AddStorie } from "./AddStorie";

export const Stories = () => {
  return (
    <div className="flex items-center md:gap-3  justify-start md:justify-center xl:justify-start border-b border-stone-300 py-4">
      <Swiper
        slidesPerView={3}
        navigation={true}
        modules={[Navigation]}
        className="flex items-center gap-2 px-20"
        breakpoints={{
          360: {
            slidesPerView: 4,
          },
          500: {
            slidesPerView: 6,
          },
          768: {
            slidesPerView: 8,
          },
        }}
      >
        <SwiperSlide>
          <AddStorie />
        </SwiperSlide>
        <SwiperSlide>
          <Storie />
        </SwiperSlide>
        <SwiperSlide>
          <Storie />
        </SwiperSlide>
        <SwiperSlide>
          <Storie />
        </SwiperSlide>
        <SwiperSlide>
          <Storie />
        </SwiperSlide>
        <SwiperSlide>
          <Storie />
        </SwiperSlide>
        <SwiperSlide>
          <Storie />
        </SwiperSlide>
        <SwiperSlide>
          <Storie />
        </SwiperSlide>
        <SwiperSlide>
          <Storie />
        </SwiperSlide>
        <SwiperSlide>
          <Storie />
        </SwiperSlide>
        <SwiperSlide>
          <Storie />
        </SwiperSlide>
        <SwiperSlide>
          <Storie />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
