import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/modal/Modal";
import { useUserByID } from "../authentication/queries/useUserByID";
import { ModalStories } from "./modal/ModalStories";
import { Storie as StorieSchema } from "./schema/StorieSchema";
import { Tooltip } from "react-tooltip";

const MAX_LENGTH = 10;

export const Storie = ({ user_id }: StorieSchema) => {
  const { user } = useUserByID(user_id);
  const { t } = useTranslation();

  if (!user) return null;

  const name =
    user?.user_name.length > MAX_LENGTH
      ? `${user.user_name.slice(0, MAX_LENGTH)}...`
      : user.user_name;

  return (
    <div className="flex flex-col items-center gap-2">
      <Modal>
        <Modal.Content>
          <ModalStories />
        </Modal.Content>
        <Modal.Open>
          <Button aria-label={t("stories.open")} modifier="storie">
            <div className="p-1 bg-white dark:bg-black rounded-full">
              <img
                src={user?.avatar_url}
                alt={user?.user_name}
                className="rounded-full w-14 h-14"
              />
            </div>
          </Button>
        </Modal.Open>
        {name.endsWith("...") ? (
          <div>
            <p
              data-tooltip-id={`${name}-tooltip`}
              data-tooltip-place="top"
              className="text-xs text-stone-900 dark:text-stone-100"
            >
              {name}
            </p>
            <Tooltip id={`${name}-tooltip`}>{user.user_name}</Tooltip>
          </div>
        ) : (
          <p className="text-xs text-stone-900 dark:text-stone-100">{name}</p>
        )}
      </Modal>
    </div>
  );
};
