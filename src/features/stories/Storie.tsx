import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button";
import { Modal } from "../../ui/modal/Modal";
import { useUserByID } from "../authentication/queries/useUserByID";
import { ModalStories } from "./modal/ModalStories";
import { Storie as StorieSchema } from "./schema/StorieSchema";
import { Tooltip } from "react-tooltip";
import { useMediaQuery } from "usehooks-ts";
import { useGetProfileStories } from "./queries/useGetProfileStories";
import { useAuth } from "../authentication/context/useAuth";

const MAX_LENGTH = 10;

export const Storie = ({ user_id }: StorieSchema) => {
  const { user: current } = useAuth();
  const { user } = useUserByID(user_id);
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(min-width:576px)");
  const { watched, stories } = useGetProfileStories({
    profileID: user?.user_id,
    userID: current?.id,
  });

  if (!user) return null;

  const name =
    user?.user_name.length > MAX_LENGTH
      ? `${user.user_name.slice(0, MAX_LENGTH)}...`
      : user.user_name;

  const isWatched = watched && stories && watched.length >= stories.length;

  return (
    <div className="flex flex-col items-center gap-2">
      <Modal.Content
        fullScreen={isMobile ? false : true}
        manageClass={`open-stories-${user_id}`}
        parentClass={`w-full mx-auto flex items-center gap-6 max-h-[700px] h-[700px] max-w-[700px] ${
          !isMobile &&
          "relative w-full  grow max-h-full flex flex-col  md:max-w-[600px]  mx-auto"
        }`}
      >
        <ModalStories clickedID={user_id} />
      </Modal.Content>
      <Modal.Open openClass={`open-stories-${user_id}`}>
        <Button
          aria-label={t("stories.open")}
          modifier={isWatched ? "watched-storie" : "storie"}
        >
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
    </div>
  );
};
