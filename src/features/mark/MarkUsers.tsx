import { useRef } from "react";
import useMousePosition from "../../hooks/useMousePosition";

export const MarkUsers = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { x, y } = useMousePosition({ ref });

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-black/70"
      onClick={(e) => e.stopPropagation()}
      ref={ref}
    >
      {x} - {y}
    </div>
  );
};
