import { Storie } from "./Storie";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { AddStorie } from "./AddStorie";
import { useGetAllStories } from "./queries/useGetAllStories";
import { Wrapper } from "../../ui/Wrapper";
import "swiper/css";
import "swiper/css/navigation";
import { StoriesSkeleton } from "./StoriesSkeleton";
import { useAuth } from "../authentication/context/useAuth";

export const Stories = () => {
  const { user } = useAuth();
  const { stories, isLoading } = useGetAllStories({ current: user?.id });

  const filteredStories = stories?.filter((storie) => storie.inner_id === null);

  if (isLoading)
    return (
      <div className="mx-auto w-full max-w-4xl flex md:gap-3 justify-start md:justify-center xl:justify-start border-b border-stone-300 py-4">
        <StoriesSkeleton />
      </div>
    );

  return (
    <div className="flex md:gap-3 justify-start md:justify-center xl:justify-start border-b border-stone-300 py-4">
      <Wrapper modifier="details">
        {filteredStories && filteredStories.length > 0 ? (
          <Swiper
            slidesPerView={4}
            navigation={true}
            modules={[Navigation]}
            className="flex self-start gap-6 w-full"
            wrapperClass="flex gap-2"
            breakpoints={{
              280: {
                slidesPerView: 4,
              },
              350: {
                slidesPerView: 5,
              },
              480: {
                slidesPerView: 6,
              },
              600: {
                slidesPerView: 8,
              },
              768: {
                slidesPerView: 10,
              },
            }}
          >
            <SwiperSlide>
              <AddStorie />
            </SwiperSlide>
            {filteredStories?.map((storie) => (
              <SwiperSlide key={storie.id}>
                <Storie {...storie} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <AddStorie />
        )}
      </Wrapper>
    </div>
  );
};
