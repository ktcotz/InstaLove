import { Button } from "../../ui/Button";
import { CustomLink } from "../../ui/CustomLink";
import { Loader } from "../../ui/Loader";
import { useSignout } from "../authentication/mutations/useSignout";
import { useUser } from "../authentication/queries/useUser";

export const User = () => {
  const { user, isLoading } = useUser();
  const { signoutUser } = useSignout();

  if (isLoading) return <Loader />;

  if (!user) return null;

  return (
    <div className="flex items-center gap-2 justify-between self-stretch">
      <div className="flex items-center gap-4">
        <CustomLink
          to={`/profile/${user.user_metadata?.user_name}`}
          modifier="avatar"
        >
          <img
            src={`${user.user_metadata?.avatar_url}`}
            alt={user.user_metadata?.user_name}
            width={48}
            height={48}
            className="rounded-full"
          />
        </CustomLink>
        <div className="flex flex-col">
          <CustomLink
            to={`/profile/${user.user_metadata?.user_name}`}
            modifier="avatar-name"
          >
            {user.user_metadata?.user_name}
          </CustomLink>
          <p className="text-sm text-stone-500">Kamil Naskręt</p>
        </div>
      </div>
      <Button modifier="text" onClick={() => signoutUser()}>
        Wyloguj
      </Button>
    </div>
  );
};
