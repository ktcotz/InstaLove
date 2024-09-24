import { useEffect, useRef, useState } from "react";
import { useEventListener, useInterval, useMediaQuery } from "usehooks-ts";
import { DesktopSwiper } from "./DesktopSwiper";
import { MobileSwiper } from "./MobileSwiper";
import { useGetAllStories } from "../queries/useGetAllStories";
import { Loader } from "../../../ui/Loader";
import { Swiper } from "swiper/types";

type ModalStoriesProps = {
  clickedID: string;
};

export const ModalStories = ({ clickedID }: ModalStoriesProps) => {
  const { stories, isLoading } = useGetAllStories();
  const [swiper, setSwiper] = useState<Swiper | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [initialSlide, setInitialSlide] = useState(0);
  const [timer, setTimer] = useState(0);
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

  const handleChangePlaying = () => {
    setIsPlaying((prev) => !prev);
  };

  useEventListener("keydown", handleSwiperSlide, ref);

  useInterval(
    () => {
      setTimer((prev) => prev + 1);
    },
    isPlaying && timer !== 25 ? 1000 : null
  );

  useEffect(() => {
    if (timer === 25) {
      const slide =
        initialSlide === stories!.length - 1
          ? stories!.length - 1
          : initialSlide + 1;
      swiper?.slideTo(slide);
      setInitialSlide(slide);
    }
  }, [timer, swiper, initialSlide, stories]);

  if (isLoading) return <Loader />;
  if (!stories) return null;

  const sortedStories = [
    ...stories.filter((storie) => storie.user_id === clickedID),
    ...stories.filter((storie) => storie.user_id !== clickedID),
  ];

  return isLaptop ? (
    <DesktopSwiper
      initialSlide={initialSlide}
      changeSlide={(slide) => setInitialSlide(slide)}
      stories={sortedStories}
      setSwiper={setSwiper}
      isPlaying={isPlaying}
      handleChangePlaying={handleChangePlaying}
      timer={timer}
      resetTimer={() => setTimer(0)}
    />
  ) : (
    <MobileSwiper
      stories={sortedStories}
      setSwiper={setSwiper}
      initialSlide={initialSlide}
      changeSlide={(slide) => setInitialSlide(slide)}
      handleChangePlaying={handleChangePlaying}
      timer={timer}
      isPlaying={isPlaying}
      resetTimer={() => setTimer(0)}
    />
  );
};
