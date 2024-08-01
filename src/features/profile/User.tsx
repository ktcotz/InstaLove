import { Button } from "../../ui/Button";
import { CustomLink } from "../../ui/CustomLink";
import { Loader } from "../../ui/Loader";
import { useSignout } from "../authentication/mutations/useSignout";
import { useUser } from "../authentication/queries/useUser";
import { useProfile } from "./queries/useProfile";

export const User = () => {
  const { user, isLoading } = useUser();
  const { data: currentUser } = useProfile(user!.user_metadata.user_name);
  const { signoutUser } = useSignout();

  if (isLoading) return <Loader />;

  if (!currentUser) return null;

  return (
    <div className="flex items-center gap-2 justify-between self-stretch">
      <div className="flex items-center gap-4">
        <CustomLink
          to={`/dashboard/${currentUser.user_name}`}
          modifier="avatar"
        >
          <img
            src={`${currentUser.avatar_url}`}
            alt={currentUser.user_name}
            width={48}
            height={48}
            className="rounded-full w-[48px] h-[48px]"
          />
        </CustomLink>
        <div className="flex flex-col">
          <CustomLink
            to={`/dashboard/${currentUser.user_name}`}
            modifier="avatar-name"
          >
            {currentUser.user_name}
          </CustomLink>
          <p className="text-sm text-stone-500">{currentUser.fullName}</p>
        </div>
      </div>
      <Button modifier="text" onClick={() => signoutUser()}>
        Wyloguj
      </Button>
    </div>
  );
};
