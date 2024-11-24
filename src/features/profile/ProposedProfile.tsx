import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button";
import { CustomLink } from "../../ui/CustomLink";
import { useAddNotification } from "../notifications/mutations/useAddNotification";
import { StorieAvatar } from "./avatar/StorieAvatar";
import { useHover } from "./hooks/useHover";
import { HoverProfile } from "./HoverProfile";
import { useObservation } from "./mutations/useObservation";
import { useGetObserve } from "./queries/useGetObserve";
import { Profile } from "./schema/ProfilesSchema";
import { useAuth } from "../authentication/context/useAuth";

type ProposedProfileProps = {
  profile: Profile;
};

export const ProposedProfile = ({ profile }: ProposedProfileProps) => {
  const { user_name, user_id } = profile;
  const { t } = useTranslation();
  const { user: currentUser } = useAuth();
  const { isHover, hover, unhover } = useHover();
  const { observer } = useObservation({
    user_id: currentUser!.id,
    observe_id: user_id,
  });

  const { notify } = useAddNotification({ user_id: currentUser!.id });

  const { observation } = useGetObserve({
    user_id: currentUser!.id,
    observe_id: user_id,
  });

  const handleObserve = () => {
    if (!currentUser) return;

    observer(
      {
        user_id: currentUser.id,
        observe_id: user_id,
        user_name: currentUser?.user_metadata.user_name,
        observer_name: user_name,
      },
      {
        onSuccess: () => {
          if (isObserve) return;

          notify({
            status: "unread",
            type: "observe",
            user_id: user_id,
            by_user: currentUser.id,
            post_id: null,
          });
        },
      }
    );
  };

  const isObserve = observation && observation.length > 0;

  return (
    <div
      onMouseLeave={() => unhover()}
      className="relative flex items-center gap-2 justify-between self-stretch"
    >
      <div className="flex items-center gap-4">
        <StorieAvatar size={40} profile={profile} />
        <div className="flex flex-col">
          <CustomLink
            to={`/dashboard/${user_name}`}
            modifier="avatar-name"
            onMouseEnter={() => hover()}
          >
            {user_name}
          </CustomLink>
          <p className="text-sm text-stone-500 dark:text-stone-100">
            {t("profile.proposes")}
          </p>
        </div>
      </div>
      <Button
        modifier={`${isObserve ? "text" : "link"}`}
        onClick={handleObserve}
      >
        {isObserve ? t("profile.unobserver") : t("profile.observe")}
      </Button>
      {isHover && <HoverProfile user_name={user_name} proposed={true} />}
    </div>
  );
};
