import { Button } from "../../ui/Button";
import { CustomLink } from "../../ui/CustomLink";
import { useUser } from "../authentication/queries/useUser";
import { useHover } from "./hooks/useHover";
import { HoverProfile } from "./HoverProfile";
import { useObservation } from "./mutations/useObservation";
import { useGetObserve } from "./queries/useGetObserve";
import { Profile } from "./schema/ProfilesSchema";

export const ProposedProfile = ({
  avatar_url,
  user_name,
  user_id,
}: Profile) => {
  const { user: currentUser } = useUser();
  const { isHover, hover, unhover } = useHover();
  const { observer } = useObservation({
    user_id: currentUser!.id,
    observe_id: user_id,
  });

  const { observation } = useGetObserve({
    user_id: currentUser!.id,
    observe_id: user_id,
  });

  const handleObserve = () => {
    if (!currentUser) return;

    observer({ user_id: currentUser.id, observe_id: user_id });
  };

  const isObserve = observation && observation.length > 0;

  return (
    <div
      onMouseLeave={() => unhover()}
      className="relative flex items-center gap-2 justify-between self-stretch"
    >
      <div className="flex items-center gap-4">
        <CustomLink
          to={`/dashboard/${user_name}`}
          modifier="avatar"
          onMouseEnter={() => hover()}
        >
          <img
            width={48}
            height={48}
            className="rounded-full w-12 h-12"
            src={avatar_url}
            alt={user_name}
          />
        </CustomLink>
        <div className="flex flex-col">
          <CustomLink
            to={`/dashboard/${user_name}`}
            modifier="avatar-name"
            onMouseEnter={() => hover()}
          >
            {user_name}
          </CustomLink>
          <p className="text-sm text-stone-500">Propozycje dla Ciebie</p>
        </div>
      </div>
      <Button
        modifier={`${isObserve ? "text" : "link"}`}
        onClick={handleObserve}
      >
        {isObserve ? "Odobserwuj" : "Obserwuj"}
      </Button>
      {isHover && <HoverProfile user_name={user_name} />}
    </div>
  );
};
