import { useRef, useState } from "react";
import { useEventListener, useMediaQuery } from "usehooks-ts";
import { DesktopSwiper } from "./DesktopSwiper";
import { MobileSwiper } from "./MobileSwiper";
import { useGetAllStories } from "../queries/useGetAllStories";
import { Loader } from "../../../ui/Loader";
import { Swiper } from "swiper/types";

export const ModalStories = () => {
  const { stories, isLoading } = useGetAllStories();
  const [swiper, setSwiper] = useState<Swiper | null>(null);
  const [initialSlide, setInitialSlide] = useState(0);
  const isLaptop = useMediaQuery("(min-width:1024px)");

  const ref = useRef(document.body);

  const handleSwiperSlide = (ev: KeyboardEvent) => {
    if (ev.key === "ArrowRight") {
      const slide =
        initialSlide === stories!.length - 1
          ? stories!.length - 1
          : initialSlide + 1;
      swiper?.slideTo(slide);
      setInitialSlide(slide);
    }
    if (ev.key === "ArrowLeft") {
      const slide = initialSlide === 0 ? 0 : initialSlide - 1;
      swiper?.slideTo(slide);
      setInitialSlide(slide);
    }
  };


  useEventListener("keydown", handleSwiperSlide, ref);

  if (isLoading) return <Loader />;

  return (
    <div
      className={`flex items-center gap-6 ${
        !isLaptop &&
        "relative w-full h-full md:max-w-[600px] md:h-[600px] mx-auto"
      }`}
    >
      {isLaptop ? (
        <DesktopSwiper
          initialSlide={initialSlide}
          changeSlide={(slide) => setInitialSlide(slide)}
          stories={stories}
          setSwiper={setSwiper}
        />
      ) : (
        <MobileSwiper stories={stories} setSwiper={setSwiper} />
      )}
    </div>
  );
};
