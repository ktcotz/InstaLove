import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ChatBarActiveUser } from "./ChatBarActiveUser";
import { useGetActiveProfiles } from "../profile/queries/useGetActiveProfiles";
import { ChatBarSkeletonUsers } from "./ChatBarSkeletonUsers";

export const ChatBarSwipper = () => {
  const { data, isLoading } = useGetActiveProfiles();

  if (isLoading)
    return (
      <div className="flex items-center gap-2">
        <ChatBarSkeletonUsers />
      </div>
    );

  return (
    <Swiper className="mx-0" slidesPerView={5}>
      {data?.map((user) => (
        <SwiperSlide key={user.id}>
          <ChatBarActiveUser user={user} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
