import { Button } from "../../ui/Button";
import { Modal } from "../../ui/modal/Modal";
import { ModalStories } from "./modal/ModalStories";

export const Storie = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Modal>
        <Modal.Content>
          <ModalStories />
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
