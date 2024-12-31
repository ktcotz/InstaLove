import { useCallback, useEffect, useRef, useState } from "react";
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
  const [nestedStories, setNestedStories] = useState(0);
  const [timer, setTimer] = useState(0);
  const isLaptop = useMediaQuery("(min-width:1024px)");
  const ref = useRef(document.body);

  const filteredStories = stories?.filter((storie) => storie.inner_id === null);

  const handleSwiperSlide = (ev: KeyboardEvent) => {
    if (nestedStories > 0) return;

    if (ev.key === "ArrowRight") {
      const slide =
        initialSlide === filteredStories!.length - 1
          ? filteredStories!.length - 1
          : initialSlide + 1;
      swiper?.slideTo(slide);
      setInitialSlide(slide);
    }
    if (ev.key === "ArrowLeft") {
      const slide = initialSlide === 0 ? 0 : initialSlide - 1;
      swiper?.slideTo(slide);
      setInitialSlide(slide);
    }

    setIsPlaying(true);
  };

  const setupNestedStories = (length: number) => {
    setNestedStories(length);
  };

  const handleChangePlaying = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSetNextSlide = useCallback(() => {
    const slide =
      initialSlide === filteredStories!.length - 1
        ? filteredStories!.length - 1
        : initialSlide + 1;
    swiper?.slideTo(slide);
    setInitialSlide(slide);
  }, [filteredStories, swiper, initialSlide]);

  useEventListener("keydown", handleSwiperSlide, ref);

  useInterval(
    () => {
      setTimer((prev) => prev + 1);
    },
    isPlaying && timer !== 25 ? 1000 : null
  );

  useEffect(() => {
    if (nestedStories > 0) return;
    if (timer === 25) {
      handleSetNextSlide();
    }
  }, [timer, nestedStories, handleSetNextSlide]);

  if (isLoading) return <Loader />;
  if (!filteredStories || !stories) return null;

  const sortedStories = [
    ...filteredStories.filter((storie) => storie.user_id === clickedID),
    ...filteredStories.filter((storie) => storie.user_id !== clickedID),
  ];

  return isLaptop ? (
    <DesktopSwiper
      initialSlide={initialSlide}
      changeSlide={(slide) => setInitialSlide(slide)}
      stories={sortedStories}
      fullStories={stories}
      nestedStories={nestedStories}
      setSwiper={setSwiper}
      isPlaying={isPlaying}
      handleChangePlaying={handleChangePlaying}
      setupNestedStories={setupNestedStories}
      handleSetNextSlide={handleSetNextSlide}
      timer={timer}
      resetTimer={() => setTimer(0)}
      resetPlaying={() => setIsPlaying(true)}
    />
  ) : (
    <MobileSwiper
      stories={sortedStories}
      fullStories={stories}
      nestedStories={nestedStories}
      setSwiper={setSwiper}
      initialSlide={initialSlide}
      setupNestedStories={setupNestedStories}
      changeSlide={(slide) => setInitialSlide(slide)}
      handleChangePlaying={handleChangePlaying}
      timer={timer}
      isPlaying={isPlaying}
      resetTimer={() => setTimer(0)}
      resetPlaying={() => setIsPlaying(true)}
      handleSetNextSlide={handleSetNextSlide}
    />
  );
};
