import { IoIosArrowBack } from "react-icons/io";
import { Button } from "../../ui";
import { useTranslation } from "react-i18next";

type DisablePostPreviewProps = {
  setPreview: (state: string | null) => void;
  setShowDescription: (state: boolean) => void;
};

export const DisablePostPreview = ({
  setPreview,
  setShowDescription,
}: DisablePostPreviewProps) => {
  const { t } = useTranslation();

  return (
    <div className="mr-auto">
      <Button
        modifier="close"
        className="flex items-center justify-center"
        aria-label={t("create.removePreview")}
        onClick={() => {
          setPreview(null);
          setShowDescription(false);
        }}
      >
        <IoIosArrowBack aria-label={t("create.removePreview")} />
      </Button>
    </div>
  );
};
