import { IoIosArrowBack } from "react-icons/io";
import { Button } from "../../ui";
import { useTranslation } from "react-i18next";
import { useMarksContext } from "../mark/context/useMarksContext";

type DisablePostPreviewProps = {
  setPreview: (state: string | null) => void;
  setShowDescription: (state: boolean) => void;
};

export const DisablePostPreview = ({
  setPreview,
  setShowDescription,
}: DisablePostPreviewProps) => {
  const { t } = useTranslation();
  const { resetMarks } = useMarksContext();

  return (
    <div className="mr-auto">
      <Button
        modifier="close"
        className="flex items-center justify-center"
        aria-label={t("create.removePreview")}
        onClick={() => {
          resetMarks();
          setPreview(null);
          setShowDescription(false);
        }}
      >
        <IoIosArrowBack
          aria-label={t("create.removePreview")}
          className="dark:fill-stone-100"
        />
      </Button>
    </div>
  );
};
