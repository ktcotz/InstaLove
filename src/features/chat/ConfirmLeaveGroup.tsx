import { useTranslation } from "react-i18next";
import { Button, Loader } from "../../ui";
import { GlobalRoutes } from "../../typing/routes";
import { useModal } from "../../ui/modal/ModalContext/useModal";
import { useNavigate } from "react-router";
import { useLeaveGroup } from "./mutations/useLeaveGroup";
import { useUser } from "../authentication/queries/useUser";

export type LeaveGroupData = {
  chatId: number;
};

export const ConfirmLeaveGroup = ({ chatId }: LeaveGroupData) => {
  const { user } = useUser();
  const { close, reset } = useModal();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate, isPending } = useLeaveGroup();

  return (
    <div className="bg-stone-100 rounded-md shadow-lg p-4 text-center dark:bg-stone-950">
      <h2 className="text-stone-950 font-semibold mb-4 dark:text-stone-50">
        {t("messages.leaveTitle")}
      </h2>
      <p className="text-stone-600 text-sm mb-8 dark:text-stone-100">
        {t("messages.leaveDescription")}
      </p>
      <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-4 sm:gap-2">
        <Button
          onClick={() =>
            mutate(
              { chatId, user_id: user?.id },
              {
                onSuccess: () => {
                  navigate(GlobalRoutes.DashboardMessages);
                  reset();
                },
              }
            )
          }
        >
          {isPending ? <Loader /> : t("messages.goOut")}
        </Button>
        <Button modifier="all-profiles" onClick={close}>
          {t("messages.noLeave")}
        </Button>
      </div>
    </div>
  );
};
