import { ChatSupabaseUsersType } from "../schema/ChatSchema";

type UsersImagesProps = {
  users: ChatSupabaseUsersType;
};
const MAX_USERS = 3;

export const UsersImages = ({ users }: UsersImagesProps) => {
  const images = users.slice(0, MAX_USERS);

  return (
    <div className="relative h-16 w-16 flex items-center justify-center">
      {images.map((image, idx) => (
        <img
          key={image.user_id.user_name}
          src={image.user_id.avatar_url}
          width={32}
          height={32}
          className="h-8 w-8 absolute border border-stone-300 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{
            top: `calc(45% + ${idx * 15}px)`,
            left: `calc(45% + ${idx * 15}px)`,
          }}
        />
      ))}
    </div>
  );
};
