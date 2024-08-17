import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { DesktopSwiper } from "./DesktopSwiper";
import { MobileSwiper } from "./MobileSwiper";
import { useGetAllStories } from "../queries/useGetAllStories";
import { Loader } from "../../../ui/Loader";

export const ModalStories = () => {
  const { stories, isLoading } = useGetAllStories();
  const [initialSlide, setInitialSlide] = useState(0);
  const isLaptop = useMediaQuery("(min-width:1024px)");

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
        />
      ) : (
        <MobileSwiper stories={stories} />
      )}
    </div>
  );
};
