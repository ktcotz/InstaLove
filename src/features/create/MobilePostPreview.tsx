import { IoClose } from "react-icons/io5";
import { Button } from "../../ui";
import { MdArrowRightAlt } from "react-icons/md";
import { useTranslation } from "react-i18next";

type MobilePostPreviewProps = {
  setPreview: (state: string | null) => void;
  setShowDescription: (state: boolean) => void;
};

export const MobilePostPreview = ({
  setPreview,
  setShowDescription,
}: MobilePostPreviewProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-2 justify-between p-3 col-start-1 col-end-4 row-start-1 -row-end-1 max-h-16 relative z-50 bg-stone-50 dark:bg-stone-950 text-stone-950">
      <Button
        modifier="close"
        aria-label={t("create.removePreview")}
        onClick={() => {
          setPreview(null);
          setShowDescription(false);
        }}
      >
        <IoClose />
      </Button>
      <Button
        modifier="mobile-create"
        onClick={() => {
          setShowDescription(true);
        }}
      >
        {t("posts.continue")} <MdArrowRightAlt />
      </Button>
    </div>
  );
};
