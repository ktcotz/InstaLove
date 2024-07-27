import { Button } from "../../ui/Button";
import { Modal } from "../../ui/modal/Modal";

export const Storie = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Modal>
        <Modal.Content>
          <div className="bg-red-600">
            <h1>Hi eldorado</h1>
            <p>Cosiek</p>
          </div>
        </Modal.Content>
        <Modal.Open>
          <Button aria-label="Open storie" modifier="storie">
            <img
              src="https://picsum.photos/56/56"
              alt=""
              className="rounded-full"
            />
          </Button>
        </Modal.Open>
        <p className="text-xs text-stone-900">sibusiso10_</p>
      </Modal>
    </div>
  );
};
