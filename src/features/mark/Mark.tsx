import { IoClose } from "react-icons/io5";
import { Button } from "../../ui";
import { useEffect, useRef, useState } from "react";
import { useMarksContext } from "./context/useMarksContext";
import { MarkDTO } from "./schema/MarkSchema";
import { useTranslation } from "react-i18next";

export const Mark = ({ id, name, x, y }: MarkDTO) => {
  const ref = useRef<HTMLDivElement>(null);
  const { removeMark } = useMarksContext();
  const [left, setLeft] = useState(0);
  const { t } = useTranslation();

  const handleRemoveMark = () => {
    removeMark(id);
  };

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
      className="absolute bg-black/90 text-stone-50 rounded-md p-2 z-40"
      style={{
        top: `${y}px`,
        left: `${left}px`,
      }}
    >
      <div className="flex items-center gap-4">
        <p>{name}</p>
        <Button
          modifier="close"
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveMark();
          }}
          aria-label={t("mark.remove")}
        >
          <IoClose aria-label={t("mark.remove")} />
        </Button>
      </div>
    </div>
  );
};
