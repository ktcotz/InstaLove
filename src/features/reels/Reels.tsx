import { Swiper, SwiperSlide } from "swiper/react";
import { Loader } from "../../ui/Loader";
import { Wrapper } from "../../ui/Wrapper";
import { useGetAllReels } from "./queries/useGetAllReels";
import { CustomReel } from "./CustomReel";
import "swiper/css";
import { Mousewheel } from "swiper/modules";
import { useState } from "react";

export type ReelMutedData = {
  id: number | null;
  isMuted: boolean;
};

export const Reels = () => {
  const { reels, isLoading } = useGetAllReels();

  const [muted, setMuted] = useState<ReelMutedData>({
    id: null,
    isMuted: true,
  });

  const toggleMuted = ({ id, isMuted }: ReelMutedData) => {
    console.log(id, isMuted);

    if (id !== muted.id) {
      return setMuted({
        id,
        isMuted: false,
      });
    }

    setMuted({
      id,
      isMuted,
    });
  };

  if (isLoading) return <Loader />;

  return (
    <Wrapper modifier="reels">
      <Swiper
        direction={"vertical"}
        mousewheel={true}
        spaceBetween={30}
        height={700}
        initialSlide={1}
        slidesPerView="auto"
        className="reel-swiper"
        modules={[Mousewheel]}
      >
        {reels?.map((reel) => (
          <SwiperSlide key={reel.id}>
            <CustomReel {...reel} muted={muted} toggleMuted={toggleMuted} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
};
