import { Storie } from "./Storie";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { AddStorie } from "./AddStorie";
import { useGetAllStories } from "./queries/useGetAllStories";
import { Loader } from "../../ui/Loader";
import { Wrapper } from "../../ui/Wrapper";

export const Stories = () => {
  const { stories, isLoading } = useGetAllStories();

  if (isLoading) return <Loader />;

  return (
    <div className="flex md:gap-3  justify-start md:justify-center xl:justify-start border-b border-stone-300 py-4">
      <Wrapper modifier="details">
        {stories && stories.length > 0 ? (
          <Swiper
            slidesPerView={4}
            navigation={true}
            modules={[Navigation]}
            className="flex self-start gap-4 w-full"
            breakpoints={{
              360: {
                slidesPerView: 5,
              },
              500: {
                slidesPerView: 6,
              },
              768: {
                slidesPerView: 10,
              },
            }}
          >
            <SwiperSlide>
              <AddStorie />
            </SwiperSlide>
            {stories?.map((storie) => (
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
