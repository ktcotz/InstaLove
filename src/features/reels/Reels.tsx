import { Swiper, SwiperSlide } from "swiper/react";
import { useGetAllReels } from "./queries/useGetAllReels";
import { CustomReel } from "./CustomReel";
import "swiper/css";
import { Mousewheel } from "swiper/modules";
import { useState } from "react";
import { ReelsSkeleton } from "./ReelsSkeleton";
import { useMediaQuery } from "usehooks-ts";

export type ReelMutedData = {
  id: number | null;
  isMuted: boolean;
};

const MOBILE_VIEWPORT = "640px";

export const Reels = () => {
  const { reels, isLoading } = useGetAllReels();
  const isMobile = useMediaQuery(`(max-width:${MOBILE_VIEWPORT})`);

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

  if (isLoading) return <ReelsSkeleton />;

  return (
    <div className="mx-auto max-w-[480px] px-1 sm:px-4">
      <Swiper
        direction={"vertical"}
        mousewheel={true}
        spaceBetween={isMobile ? 10 : 30}
        height={700}
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
    </div>
  );
};
