import { useState } from "react";

export const useHover = () => {
  const [isHover, setIsHover] = useState(false);

  const hover = () => setIsHover(true);
  const unhover = () => setIsHover(false);

  return { isHover, hover, unhover } as const;
};
