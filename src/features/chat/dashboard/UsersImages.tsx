import { CustomLink } from "../../../ui/CustomLink";
import { ChatSupabaseUsersType } from "../schema/ChatSchema";

type UsersImagesProps = {
  users: ChatSupabaseUsersType;
};
const MAX_USERS = 3;

export const UsersImages = ({ users }: UsersImagesProps) => {
  const images = users.slice(0, MAX_USERS);

  return (
    <div className="relative  h-12 xl:w-12 flex items-center xl:justify-center">
      {images.map((user, idx) => (
        <CustomLink
          key={user.user_id.user_name}
          to={`/dashboard/${user.user_id.user_name}`}
          target="_blank"
          modifier="close"
        >
          <img
            key={user.user_id.user_name}
            src={user.user_id.avatar_url}
            width={32}
            height={32}
            className="h-8 w-8 xl:left-1/2 xl:absolute border border-stone-300 rounded-full xl:-translate-x-1/2 xl:-translate-y-1/2"
            style={{
              top: `calc(30% + ${idx * 20}px)`,
            }}
          />
        </CustomLink>
      ))}
    </div>
  );
};
