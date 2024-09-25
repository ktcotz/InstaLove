import { IoClose } from "react-icons/io5";
import { Button } from "../../ui";
import { useRef } from "react";
import { useMarksContext } from "./context/useMarksContext";
import { MarkDTO } from "./schema/MarkSchema";
import { useTranslation } from "react-i18next";

export const Mark = ({ id, name, x, y, mark_id }: MarkDTO) => {
  const ref = useRef<HTMLDivElement>(null);
  const { removeMark } = useMarksContext();
  const { t } = useTranslation();

  const handleRemoveMark = () => {
    if (!id) return;
    removeMark(id);
  };

  return (
    <div
      ref={ref}
      className="absolute bg-black/90 text-stone-50 rounded-md p-2 z-40"
      style={{
        top: `${y > 90 ? 75 : y}%`,
        left: `${x > 90 ? 75 : x}%`,
      }}
    >
      <div className="flex items-center gap-4">
        <p>{name}</p>
        {!mark_id && (
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
        )}
      </div>
    </div>
  );
};
