import { Button } from "../../ui/Button";
import { useUserByID } from "../authentication/queries/useUserByID";
import { Like as LikeSchema } from "./schema/LikeSchema";

export const Like = ({ user_id }: LikeSchema) => {
  const { user } = useUserByID(user_id);

  if (!user) return null;

  return (
    <div className="flex items-center gap-3">
      <img
        src={user.avatar_url}
        alt={user.user_name}
        width={32}
        height={32}
        className="rounded-full w-8 h-8"
      />
      <div>
        <h2 className="font-semibold text-sm">{user.user_name}</h2>
        <p className="text-sm text-stone-600">{user.fullName}</p>
      </div>
      <div className="ml-auto">
        <Button modifier="submit">Obserwuj</Button>
      </div>
    </div>
  );
};
