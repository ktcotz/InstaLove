import { CustomLink } from "../../../ui/CustomLink";
import { ChatSupabaseUsersType } from "../schema/ChatSchema";

type UsersImagesProps = {
  users: ChatSupabaseUsersType;
};
const MAX_USERS = 2;

export const UsersImages = ({ users }: UsersImagesProps) => {
  const images = users.slice(0, MAX_USERS);

  return (
    <div className="relative  h-full w-full flex items-center xl:justify-center">
      {images.map((user, idx) => (
        <CustomLink
          key={user.user_id.user_name}
          to={`/dashboard/${user.user_id.user_name}`}
          target="_blank"
          modifier="close"
          onClick={(ev) => ev.stopPropagation()}
        >
          <img
            key={user.user_id.user_name}
            src={user.user_id.avatar_url}
            width={32}
            height={32}
            className="border border-stone-300 absolute top-0 left-0 w-full h-full rounded-full"
            style={{
              width: `${
                100 / images.length +
                (images.length === 2 ? 20 : images.length === 3 ? 35 : 0)
              }%`,
              height: `${
                100 / images.length +
                (images.length === 2 ? 20 : images.length === 3 ? 35 : 0)
              }%`,
              top: `${
                images.length === 1
                  ? 0
                  : images.length === 2
                  ? 25 * idx
                  : 50 * idx
              }%`,
              left: `${
                images.length === 1
                  ? 0
                  : images.length === 2
                  ? 25 * idx
                  : 50 * idx
              }%`,
            }}
          />
        </CustomLink>
      ))}
    </div>
  );
};
