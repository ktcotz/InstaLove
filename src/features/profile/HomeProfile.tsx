import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/modal/Modal";
import { AllProposedProfiles } from "./AllProposedProfiles";
import { ProposedProfiles } from "./ProposedProfiles";
import { User } from "./User";

export const HomeProfile = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <User />
      <div className="flex items-center gap-2 justify-between self-stretch">
        <h2 className="text-stone-600 font-medium text-sm dark:text-stone-300">
          {t("profile.proposes")}
        </h2>

        <Modal.Open openClass="all-profiles">
          <Button modifier="all-profiles">{t("profile.seeAll")}</Button>
        </Modal.Open>
        <Modal.Content
          manageClass="all-profiles"
          parentClass="mx-auto max-w-lg mt-14"
        >
          <AllProposedProfiles />
        </Modal.Content>
      </div>
      <ProposedProfiles />
    </div>
  );
};
