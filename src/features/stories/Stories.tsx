import { Storie } from "./Storie";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { AddStorie } from "./AddStorie";
import { useGetAllStories } from "./queries/useGetAllStories";
import { Loader } from "../../ui/Loader";

export const Stories = () => {
  const { stories, isLoading } = useGetAllStories();

  if (isLoading) return <Loader />;

  return (
    <div className="flex md:gap-3  justify-start md:justify-center xl:justify-start border-b border-stone-300 py-4">
      {stories && stories.length > 0 ? (
        <Swiper
          slidesPerView={2}
          navigation={true}
          modules={[Navigation]}
          className="flex self-start gap-4 px-20 w-full"
          breakpoints={{
            360: {
              slidesPerView: 3,
            },
            500: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 8,
            },
          }}
        >
          <SwiperSlide>
            <AddStorie />
          </SwiperSlide>
          {stories?.map((storie) => (
            <SwiperSlide>
              <Storie key={storie.id} {...storie} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <AddStorie />
      )}
    </div>
  );
};
