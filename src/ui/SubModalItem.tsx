import { useUser } from "../features/authentication/queries/useUser";
import { useUserByID } from "../features/authentication/queries/useUserByID";
import { useObservation } from "../features/profile/mutations/useObservation";
import { useGetObserve } from "../features/profile/queries/useGetObserve";
import { Button } from "./Button";

type SubModalItemProps = {
  user_id: string;
};

export const SubModalItem = ({ user_id }: SubModalItemProps) => {
  const { user: currentUser } = useUser();
  const { user } = useUserByID(user_id);
  const { observation } = useGetObserve({
    user_id: currentUser?.id,
    observe_id: user?.user_id,
  });
  const { observer } = useObservation({
    user_id: currentUser?.id,
    observe_id: user?.user_id,
  });

  if (!user) return null;

  const handleObserve = () => {
    observer({ user_id: currentUser?.id, observe_id: user?.user_id });
  };

  const isObserve = observation && observation.length > 0;

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
      {currentUser?.id === user?.user_id ? null : (
        <div className="ml-auto">
          <Button modifier="submit" onClick={handleObserve}>
            {isObserve ? "Odobserwuj" : "Obserwuj"}
          </Button>
        </div>
      )}
    </div>
  );
};
