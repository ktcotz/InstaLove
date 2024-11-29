import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router";
import { useUser } from "../../authentication/queries/useUser";
import { useModal } from "../../../ui/modal/ModalContext/useModal";
import { useDeleteChat } from "../mutations/useDeleteChat";
import { Button, Loader } from "../../../ui";
import { GlobalRoutes } from "../../../typing/routes";

type ConfirmDeleteProps = {
  chat_id: number;
};

export const ConfirmDelete = ({ chat_id }: ConfirmDeleteProps) => {
  const { user } = useUser();
  const { close, reset } = useModal();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate, isPending } = useDeleteChat({ user_id: user?.id });

  return (
    <div className="bg-stone-100 rounded-md shadow-lg p-4 text-center dark:bg-stone-950">
      <h2 className="text-stone-950 font-semibold mb-4 dark:text-stone-50">
        {t("messages.removeChatTitle")}
      </h2>
      <p className="text-stone-600 text-sm mb-8 dark:text-stone-100">
        {t("messages.removeDescription")}
      </p>
      <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-4 sm:gap-2">
        <Button
          onClick={() =>
            mutate(
              { chat_id },
              {
                onSuccess: () => {
                  navigate(GlobalRoutes.DashboardMessages);
                  reset();
                },
              }
            )
          }
        >
          {isPending ? <Loader /> : t("messages.remove")}
        </Button>
        <Button modifier="all-profiles" onClick={close}>
          {t("posts.nodelete")}
        </Button>
      </div>
    </div>
  );
};
