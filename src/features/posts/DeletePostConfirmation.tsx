import { useTranslation } from "react-i18next";
import { Button, Loader } from "../../ui";
import { useModal } from "../../ui/modal/ModalContext/useModal";
import { useDeletePost } from "./mutations/useDeletePost";
import { useUser } from "../authentication/queries/useUser";

type DeletePostConfirmationProps = {
  id: number;
};

export const DeletePostConfirmation = ({ id }: DeletePostConfirmationProps) => {
  const { user } = useUser();
  const { reset, close } = useModal();
  const { t } = useTranslation();

  const { isPending, deletingPost } = useDeletePost();

  return (
    <div className="bg-stone-100 rounded-md shadow-lg p-4 text-center dark:bg-stone-950">
      <h2 className="text-stone-950 font-semibold mb-4 dark:text-stone-50">
        {t("posts.deleteTitle")}
      </h2>
      <p className="text-stone-600 text-sm mb-8 dark:text-stone-100">
        {t("posts.deleteDescription")}
      </p>
      <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-4 sm:gap-2">
        <Button
          onClick={() => {
            deletingPost(
              { id, user_id: user?.id },
              {
                onSuccess: () => {
                  reset();
                },
              }
            );
          }}
        >
          {t("posts.delete")}
        </Button>
        <Button modifier="all-profiles" onClick={close}>
          {isPending ? <Loader /> : t("posts.nodelete")}
        </Button>
      </div>
    </div>
  );
};
