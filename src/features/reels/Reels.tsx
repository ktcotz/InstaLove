import { Swiper, SwiperSlide } from "swiper/react";
import { Loader } from "../../ui/Loader";
import { Wrapper } from "../../ui/Wrapper";
import { useGetAllReels } from "./queries/useGetAllReels";
import { CustomReel } from "./CustomReel";
import "swiper/css";
import { Mousewheel } from "swiper/modules";

export const Reels = () => {
  const { reels, isLoading } = useGetAllReels();

  if (isLoading) return <Loader />;

  return (
    <Wrapper modifier="reels">
      <Swiper
        direction={"vertical"}
        mousewheel={true}
        spaceBetween={30}
        height={700}
        slidesPerView="auto"
        className="reel-swiper"
        modules={[Mousewheel]}
      >
        {reels?.map((reel) => (
          <SwiperSlide key={reel.id}>
            <CustomReel {...reel} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};
