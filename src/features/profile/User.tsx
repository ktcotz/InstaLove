import { useTranslation } from "react-i18next";
import { Button } from "../../ui/Button";
import { CustomLink } from "../../ui/CustomLink";
import { Loader } from "../../ui/Loader";
import { useSignout } from "../authentication/mutations/useSignout";
import { useUser } from "../authentication/queries/useUser";
import { useProfile } from "./queries/useProfile";

export const User = () => {
  const { t } = useTranslation();

  const { user, isLoading } = useUser();
  const { data: currentUser } = useProfile(user!.user_metadata.user_name);
  const { signoutUser } = useSignout();

  if (isLoading) return <Loader />;

  if (!currentUser) return null;

  return (
    <div className="flex items-center gap-2 justify-between self-stretch">
      <div className="flex items-center gap-4">
        <div className="p-2">
          <CustomLink
            to={`/dashboard/${currentUser.user_name}`}
            modifier="avatar"
          >
            <img
              src={`${currentUser.avatar_url}`}
              alt={currentUser.user_name}
              width={40}
              height={40}
              className="rounded-full w-10 h-10 object-cover"
            />
          </CustomLink>
        </div>
        <div className="flex flex-col">
          <CustomLink
            to={`/dashboard/${currentUser.user_name}`}
            modifier="avatar-name"
          >
            {currentUser.user_name}
          </CustomLink>
          <p className="text-sm text-stone-500 dark:text-stone-300">
            {currentUser.fullName}
          </p>
        </div>
      </div>
      <Button
        modifier="text"
        onClick={() => signoutUser({ user_id: user?.id })}
      >
        {t("home.logout")}
      </Button>
    </div>
  );
};
