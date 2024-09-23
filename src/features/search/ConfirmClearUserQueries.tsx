import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button";
import { useModal } from "../../ui/modal/ModalContext/useModal";
import { Wrapper } from "../../ui/Wrapper";
import { useUser } from "../authentication/queries/useUser";
import { useClearUserSearch } from "./mutations/useClearUserSearch";

export const ConfirmClearUserQueries = () => {
  const { user } = useUser();
  const { close } = useModal();
  const { clear } = useClearUserSearch(user?.id);
  const { t } = useTranslation();

  return (
    <Wrapper modifier="submodal">
      <div className="bg-stone-100 rounded-md shadow-lg p-4 text-center dark:bg-stone-950">
        <h2 className="text-stone-950 font-semibold mb-4 dark:text-stone-50">
          {t("search.clearHistory")}
        </h2>
        <p className="text-stone-600 text-sm mb-8 dark:text-stone-100">
          {t("search.clearDescription")}
        </p>
        <div className="grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 gap-4 sm:gap-2">
          <Button
            onClick={() => {
              clear({ user_id: user?.id });
              close();
            }}
          >
            {t("search.clear")}
          </Button>
          <Button modifier="all-profiles" onClick={close}>
            {t("search.clearDisable")}
          </Button>
        </div>
      </div>
    </Wrapper>
  );
};
