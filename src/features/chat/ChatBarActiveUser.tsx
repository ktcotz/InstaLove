import { useUser } from "../authentication/queries/useUser";
import { useUserByID } from "../authentication/queries/useUserByID";

export const ChatBarActiveUser = () => {
  const { user: current } = useUser();
  const { user } = useUserByID(current?.id);

  return (
    <div className="flex flex-col items-center gap-2">
      <img
        src={user?.avatar_url}
        alt={user?.fullName}
        width={48}
        height={48}
        className="w-12 h-12 rounded-full border-2 border-stone-300 dark:border-stone-50"
      />
      <p className="text-xs text-stone-950 dark:text-stone-100">
        {user?.fullName.split(" ")[0]}
      </p>
    </div>
  );
};
