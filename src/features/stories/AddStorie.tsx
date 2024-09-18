import { FaPlus } from "react-icons/fa6";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/modal/Modal";
import { CreatePost } from "../create/CreatePost";

export const AddStorie = () => {
  return (
    <Modal>
      <Modal.Open>
        <Button modifier="storie" aria-label="Dodaj storie">
          <FaPlus />
        </Button>
      </Modal.Open>
      <Modal.Content>
        <CreatePost type="storie" />
      </Modal.Content>
    </Modal>
  );
};
