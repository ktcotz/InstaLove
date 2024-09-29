import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ChatBarActiveUser } from "./ChatBarActiveUser";

export const ChatBarSwipper = () => {
  return (
    <Swiper className="mx-0" slidesPerView={5}>
      <SwiperSlide>
        <ChatBarActiveUser />
      </SwiperSlide>
      <SwiperSlide>
        <ChatBarActiveUser />
      </SwiperSlide>
      <SwiperSlide>
        <ChatBarActiveUser />
      </SwiperSlide>
      <SwiperSlide>
        <ChatBarActiveUser />
      </SwiperSlide>
      <SwiperSlide>
        <ChatBarActiveUser />
      </SwiperSlide>
      <SwiperSlide>
        <ChatBarActiveUser />
      </SwiperSlide>
      <SwiperSlide>
        <ChatBarActiveUser />
      </SwiperSlide>
      <SwiperSlide>
        <ChatBarActiveUser />
      </SwiperSlide>
      <SwiperSlide>
        <ChatBarActiveUser />
      </SwiperSlide>
      <SwiperSlide>
        <ChatBarActiveUser />
      </SwiperSlide>
    </Swiper>
  );
};
