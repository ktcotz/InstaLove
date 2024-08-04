import { Button } from "../../ui/Button";
import { Modal } from "../../ui/modal/Modal";
import { AllProposedProfiles } from "./AllProposedProfiles";
import { ProposedProfiles } from "./ProposedProfiles";
import { User } from "./User";

export const HomeProfile = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <User />
      <div className="flex items-center gap-2 justify-between self-stretch">
        <h2 className="text-stone-600 font-medium text-sm">
          Propozycje dla Ciebie
        </h2>
        <Modal>
          <Modal.Open>
            <Button modifier="all-profiles">Zobacz wszystkich</Button>
          </Modal.Open>
          <Modal.Content>
            <AllProposedProfiles />
          </Modal.Content>
        </Modal>
      </div>
      <ProposedProfiles />
    </div>
  );
};
