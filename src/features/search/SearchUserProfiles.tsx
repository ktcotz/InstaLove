import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/modal/Modal";
import { useUser } from "../authentication/queries/useUser";
import { ConfirmClearUserQueries } from "./ConfirmClearUserQueries";
import { useGetUserSearchQueries } from "./query/useGetUserSearchQueries";
import { SearchQueryProfile } from "./SearchQueryProfile";

export const SearchUserProfiles = () => {
  const { user } = useUser();
  const { queries } = useGetUserSearchQueries(user?.id);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-3 mb-1">
        <h3 className="text-sm font-semibold text-stone-950">
          {t("search.latest")}
        </h3>
        {queries && queries.length > 0 && (
          <Modal>
            <Modal.Open>
              <Button modifier="link">{t("search.clear")}</Button>
            </Modal.Open>
            <Modal.Content>
              <ConfirmClearUserQueries />
            </Modal.Content>
          </Modal>
        )}
      </div>
      <div className="flex flex-col gap-1 ">
        {queries?.map((query) => (
          <SearchQueryProfile search_user={query.search_user_id} />
        ))}
      </div>
    </div>
  );
};
