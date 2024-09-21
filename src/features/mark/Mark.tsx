import { IoClose } from "react-icons/io5";
import { Button } from "../../ui";
import { useEffect, useRef, useState } from "react";

type MarkProps = {
  name: string;
  x: number;
  y: number;
};

export const Mark = ({ name, x, y }: MarkProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    const left =
      x + ref.current.offsetWidth > window.innerWidth
        ? window.innerWidth - ref.current.offsetWidth - 40
        : x;

    setLeft(left);
  }, [x]);

  return (
    <div
      ref={ref}
      className="absolute bg-black/90 text-stone-50 rounded-md p-2"
      style={{
        top: `${y}px`,
        left: `${left}px`,
      }}
    >
      <div className="flex items-center gap-4">
        <p>{name}</p>
        <Button modifier="close">
          <IoClose />
        </Button>
      </div>
    </div>
  );
};
