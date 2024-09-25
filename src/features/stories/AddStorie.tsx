import { FaPlus } from "react-icons/fa6";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/modal/Modal";
import { CreatePost } from "../create/CreatePost";
import { useTranslation } from "react-i18next";

export const AddStorie = () => {
  const { t } = useTranslation();

  return (
    <Modal>
      <Modal.Open>
        <Button modifier="storie" aria-label={t("stories.add")}>
          <div className="w-16 h-16 flex items-center justify-center rounded-full p-1 bg-white dark:bg-black">
            <FaPlus
              aria-label={t("stories.add")}
              className="text-xl text-stone-950 dark:text-stone-50"
            />
          </div>
        </Button>
      </Modal.Open>
      <Modal.Content parentClass="mx-auto max-w-xl sm:max-w-5xl">
        <CreatePost type="storie" />
      </Modal.Content>
    </Modal>
  );
};
