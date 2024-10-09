import { CustomLink } from "../../ui";
import { Profile } from "../profile/schema/ProfilesSchema";

type ChatBarActiveUserProps = {
  user: Profile;
};

export const ChatBarActiveUser = ({ user }: ChatBarActiveUserProps) => {
  return (
    <CustomLink modifier="active" to={user.user_name}>
      <div className="relative">
        <img
          src={user?.avatar_url}
          alt={user?.fullName}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full border-2 border-stone-300 dark:border-stone-50"
        />
        <div className="h-4 w-4 rounded-full flex items-center justify-center bg-stone-50 absolute bottom-0 right-0">
          <span className="h-2 w-2 rounded-full bg-green-600"></span>
        </div>
      </div>
      <p className="text-xs text-stone-950 dark:text-stone-100">
        {user?.user_name}
      </p>
    </CustomLink>
  );
};
