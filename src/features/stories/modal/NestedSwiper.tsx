import { Stories } from "../schema/StorieSchema";
import { Swiper, SwiperSlide } from "swiper/react";
import { ModalStorie } from "./ModalStorie";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { Swiper as SwiperType } from "swiper/types";

type NestedSwiperProps = {
  stories: Stories;
  timer: number;
  setupNestedStories: (length: number) => void;
  nestedStories: number;
  handleSetNextSlide: () => void;
  resetTimer: () => void;
  handleChangePlaying: () => void;
  resetPlaying: () => void;
};

export const NestedSwiper = ({
  stories,
  timer,
  nestedStories,
  setupNestedStories,
  handleSetNextSlide,
  resetTimer,
  handleChangePlaying,
  resetPlaying,
}: NestedSwiperProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [nestedStorie, setNestedStorie] = useState(0);
  const ref = useRef(document.body);

  const handleChangeSlide = (ev: KeyboardEvent) => {
    if (ev.key === "ArrowRight") {
      if (nestedStorie === nestedStories - 1) {
        return setupNestedStories(0);
      }
      const slide =
        nestedStorie === nestedStories - 1
          ? nestedStories - 1
          : nestedStorie + 1;

      swiper?.slideTo(slide);
      setNestedStorie(slide);
    }
    if (ev.key === "ArrowLeft") {
      if (nestedStorie === 0) {
        return setupNestedStories(0);
      }
      const slide = nestedStorie === 0 ? 0 : nestedStorie - 1;

      swiper?.slideTo(slide);
      setNestedStorie(slide);
    }
    resetPlaying();
  };

  const handleNextSlide = useCallback(() => {
    const slide =
      nestedStorie === nestedStories - 1 ? nestedStories - 1 : nestedStorie + 1;
    swiper?.slideTo(slide);
    setNestedStorie(slide);
  }, [nestedStorie, nestedStories, swiper]);

  useEffect(() => {
    if (timer === 25 && nestedStorie === nestedStories - 1) {
      handleSetNextSlide();
    }

    if (timer === 25 && nestedStorie < nestedStories - 1) {
      handleNextSlide();
      resetTimer();
    }
  }, [
    nestedStorie,
    nestedStories,
    timer,
    handleSetNextSlide,
    resetTimer,
    handleNextSlide,
  ]);

  useEffect(() => {
    setupNestedStories(stories.length);

    return () => {
      setupNestedStories(0);
    };
  }, [stories.length, setupNestedStories]);

  useEventListener("keydown", handleChangeSlide, ref, { capture: true });

  return (
    <Swiper
      nested={true}
      className="nested-stories "
      onSwiper={setSwiper}
      onSlideChange={(ev) => {
        setNestedStorie(ev.activeIndex);
        resetTimer();
      }}
    >
      {stories.map((storie, id) => (
        <SwiperSlide>
          <ModalStorie
            key={storie.id}
            {...storie}
            timer={timer}
            nested={true}
            nestedStories={nestedStories}
            active={id === nestedStorie}
            nestedStorie={nestedStorie}
            handleChangePlaying={handleChangePlaying}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
