import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ChatBarActiveUser } from "./ChatBarActiveUser";
import { useGetActiveProfiles } from "../profile/queries/useGetActiveProfiles";
import { ChatBarSkeletonUsers } from "./ChatBarSkeletonUsers";
import { useAuth } from "../authentication/context/useAuth";
import { useMediaQuery } from "usehooks-ts";

export const ChatBarSwipper = () => {
  const { user } = useAuth();
  const { data, isLoading } = useGetActiveProfiles({ current: user?.id });
  const isTablet = useMediaQuery("(max-width:768px)");
  const isMobile = useMediaQuery("(max-width:540px)");

  if (isLoading)
    return (
      <div className="flex items-center gap-2">
        <ChatBarSkeletonUsers />
      </div>
    );

  if (data?.length === 0) return null;

  return (
    <Swiper
      className="active-users"
      slidesPerView={isTablet ? (isMobile ? 7 : 10) : 5}
    >
      {data?.slice(0, 10).map((user) => (
        <SwiperSlide key={user.id}>
          <ChatBarActiveUser user={user} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
