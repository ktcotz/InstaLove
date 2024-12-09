import { TfiClose } from "react-icons/tfi";
import { Button, CustomLink } from "../../../ui";
import { useAuth } from "../../authentication/context/useAuth";
import { Profile } from "../../profile/schema/ProfilesSchema";
import { useDeleteReaction } from "../mutations/useDeleteReaction";

type ReactionProps = {
  reaction: string;
  user_id: Profile;
  message_id: number;
};

export const Reaction = ({ user_id, reaction, message_id }: ReactionProps) => {
  const { user } = useAuth();
  const isMyReaction = user?.id === user_id.user_id;
  const { deleteReaction } = useDeleteReaction({ id: user?.id, message_id });

  return (
    <div className="flex items-center gap-3 p-2">
      <CustomLink
        modifier="avatar"
        target="_blank"
        to={`/dashboard/${user_id.user_name}`}
      >
        <img
          src={user_id.avatar_url}
          alt={user_id.user_name}
          width={32}
          height={32}
          className="rounded-full w-8 h-8"
        />
      </CustomLink>
      <div>
        <h2 className="font-semibold text-sm dark:text-stone-50">
          {user_id.user_name}
        </h2>
        <p className="text-sm text-stone-600 dark:text-stone-200">
          {user_id.fullName}
        </p>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <p className="text-2xl">{reaction}</p>
        {isMyReaction && (
          <Button
            modifier="close"
            onClick={() => deleteReaction({ message_id, id: user?.id })}
          >
            <TfiClose />
          </Button>
        )}
      </div>
    </div>
  );
};
