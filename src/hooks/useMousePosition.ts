import { useState, useEffect, RefObject } from "react";

interface MousePosition {
  x: number | null;
  y: number | null;
}

type useMousePositionProps<T extends HTMLElement> = {
  ref: RefObject<T>;
};

const useMousePosition = ({
  ref,
}: useMousePositionProps<HTMLDivElement>): MousePosition => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: null,
    y: null,
  });

  useEffect(() => {
    const updateClickPosition = (ev: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setMousePosition({
          x: Math.round(ev.clientX - rect.left),
          y: Math.round(ev.clientY - rect.top),
        });
      }
    };

    const container = ref.current;
    if (container) {
      container.addEventListener("click", updateClickPosition);
    }

    return () => {
      if (container) {
        container.removeEventListener("click", updateClickPosition);
      }
    };
  }, [ref]);
  return mousePosition;
};

export default useMousePosition;
