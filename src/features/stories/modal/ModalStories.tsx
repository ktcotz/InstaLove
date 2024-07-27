import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { DesktopSwiper } from "./DesktopSwiper";
import { MobileSwiper } from "./MobileSwiper";

export const ModalStories = () => {
  const [initialSlide, setInitialSlide] = useState(0);
  const isLaptop = useMediaQuery("(min-width:1024px)");

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
        />
      ) : (
        <MobileSwiper />
      )}
    </div>
  );
};
