import { FaUser } from "react-icons/fa";
import { Button } from "../../ui";
import { useTranslation } from "react-i18next";

type ShowMarksProps = {
  length: number;
  toggleMarks: () => void;
};

export const ShowMarks = ({ length, toggleMarks }: ShowMarksProps) => {
  const { t } = useTranslation();

  return (
    <div className="absolute bottom-2 left-2">
      <Button modifier="close" onClick={toggleMarks}>
        <div className="flex items-center gap-2 bg-black/70 p-2 rounded-md">
          <FaUser className="text-stone-50" />
          <p className="text-stone-50 text-xs">
            <span className="font-semibold text-stone-100">{length}</span>{" "}
            {t("mark.marks")}
          </p>
        </div>
      </Button>
    </div>
  );
};
