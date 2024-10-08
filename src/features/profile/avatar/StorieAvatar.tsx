import { useTranslation } from "react-i18next";
import { Button, Modal } from "../../../ui";
import { ModalStories } from "../../stories/modal/ModalStories";
import { useGetProfileStories } from "../../stories/queries/useGetProfileStories";
import { Profile } from "../schema/ProfilesSchema";
import { useMediaQuery } from "usehooks-ts";
import { useUser } from "../../authentication/queries/useUser";

type StorieAvatarProps = {
  size: 176 | 40;
  profile: Profile;
};

export const StorieAvatar = ({ size, profile }: StorieAvatarProps) => {
  const { user } = useUser();
  const { stories, watched } = useGetProfileStories({
    profileID: profile.user_id,
    userID: user?.id,
  });

  const isLaptop = useMediaQuery("(min-width:1024px)");
  const { t } = useTranslation();

  const avatarSizes: Record<typeof size, string> = {
    176: "w-44 h-44 rounded-full",
    40: "w-10 h-10 rounded-full",
  };

  const hasStorie = stories && stories.length > 0;
  const isWatched = stories && watched && stories.length <= watched.length;

  if (hasStorie) {
    return (
      <>
        <Modal.Open openClass="storie-avatar">
          <Button
            modifier={isWatched ? "watched" : "avatar"}
            aria-label={t("avatar.storie")}
          >
            <div className="p-1 bg-white dark:bg-stone-950 rounded-full">
              <img
                src={profile?.avatar_url}
                alt={profile?.user_name}
                width={size}
                height={size}
                className={avatarSizes[size]}
              />
            </div>
          </Button>
        </Modal.Open>
        <Modal.Content
          manageClass="storie-avatar"
          parentClass={`flex items-center gap-6 max-h-[700px] h-[700px] ${
            !isLaptop && "relative w-full h-full md:max-w-[800px]  mx-auto"
          }`}
        >
          <ModalStories clickedID={profile.user_name} />
        </Modal.Content>
      </>
    );
  }

  return (
    <div className="p-2">
      <img
        src={profile?.avatar_url}
        alt={profile?.user_name}
        width={size}
        height={size}
        className={avatarSizes[size]}
      />
    </div>
  );
};
