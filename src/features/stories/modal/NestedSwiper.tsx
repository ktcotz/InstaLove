import { Stories } from "../schema/StorieSchema";
import { Swiper, SwiperSlide } from "swiper/react";
import { ModalStorie } from "./ModalStorie";
import { useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { Swiper as SwiperType } from "swiper/types";

type NestedSwiperProps = {
  stories: Stories;
  timer: number;
  setupNestedStories: (length: number) => void;
  nestedStories: number;
};

export const NestedSwiper = ({
  stories,
  timer,
  nestedStories,
  setupNestedStories,
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
  };

  useEffect(() => {
    setupNestedStories(stories.length);

    return () => {
      setupNestedStories(0);
    };
  }, [stories.length, setupNestedStories]);

  useEventListener("keydown", handleChangeSlide, ref, { capture: true });

  return (
    <Swiper nested={true} className="nested-stories " onSwiper={setSwiper}>
      {stories.map((storie) => (
        <SwiperSlide>
          <ModalStorie
            key={storie.id}
            {...storie}
            timer={timer}
            handleChangePlaying={() => {}}
            nested={true}
            active={true}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
