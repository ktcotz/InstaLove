import { useTranslation } from "react-i18next";
import { Button, Modal } from "../../../ui";
import { ModalStories } from "../../stories/modal/ModalStories";
import { useGetProfileStories } from "../../stories/queries/useGetProfileStories";
import { Profile } from "../schema/ProfilesSchema";

type StorieAvatarProps = {
  size: 176;
  profile: Profile;
};

export const StorieAvatar = ({ size, profile }: StorieAvatarProps) => {
  const { data } = useGetProfileStories({
    profileID: profile.user_id,
  });
  const { t } = useTranslation();

  const avatarSizes: Record<typeof size, string> = {
    176: "w-44 h-44 rounded-full",
  };

  const hasStorie = data && data.length > 0;

  if (hasStorie) {
    return (
      <Modal>
        <Modal.Open>
          <Button modifier="avatar" aria-label={t("avatar.storie")}>
            <div className="p-1 bg-white rounded-full">
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
        <Modal.Content>
          <ModalStories />
        </Modal.Content>
      </Modal>
    );
  }

  return (
    <img
      src={profile?.avatar_url}
      alt={profile?.user_name}
      width={size}
      height={size}
      className={avatarSizes[size]}
    />
  );
};
