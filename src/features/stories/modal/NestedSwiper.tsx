import { Stories } from "../schema/StorieSchema";
import { Swiper, SwiperSlide } from "swiper/react";
import { ModalStorie } from "./ModalStorie";

type NestedSwiperProps = {
  stories: Stories;
};

export const NestedSwiper = ({ stories }: NestedSwiperProps) => {
  return (
    <Swiper nested={true} className="nested-stories ">
      {stories.map((storie) => (
        <SwiperSlide>
          <ModalStorie
            key={storie.id}
            {...storie}
            timer={0}
            handleChangePlaying={() => {}}
            nested={true}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
