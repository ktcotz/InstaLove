import { Button } from "../../ui/Button";
import { Modal } from "../../ui/modal/Modal";
import { useUserByID } from "../authentication/queries/useUserByID";
import { ModalStories } from "./modal/ModalStories";
import { Storie as StorieSchema } from "./schema/StorieSchema";

export const Storie = ({ user_id }: StorieSchema) => {
  const { user } = useUserByID(user_id);

  return (
    <div className="flex flex-col items-center gap-2">
      <Modal>
        <Modal.Content>
          <ModalStories />
        </Modal.Content>
        <Modal.Open>
          <Button aria-label="Open storie" modifier="storie">
            <img
              src={user?.avatar_url}
              alt={user?.user_name}
              className="rounded-full w-14 h-14"
            />
          </Button>
        </Modal.Open>
        <p className="text-xs text-stone-900">{user?.user_name}</p>
      </Modal>
    </div>
  );
};
