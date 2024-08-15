import { Button } from "../../ui/Button";
import { Profile } from "../profile/schema/ProfilesSchema";
import { usePostsContext } from "./context/usePostsContext";

export const SuggestionUser = ({
  user_name,
  avatar_url,
  fullName,
}: Profile) => {
  const { setValue, setFocus } = usePostsContext();

  return (
    <div className="border-b border-stone-300">
      <Button
        modifier="suggestion"
        onClick={() => {
          setValue("comment", `@${user_name} `);
          setFocus("comment");
        }}
      >
        <img
          src={avatar_url}
          alt={user_name}
          width={32}
          height={32}
          className="rounded-full w-8 h-8"
        />
        <div className="text-left">
          <h2 className="font-semibold text-sm">{user_name}</h2>
          <p className="text-sm text-stone-600">{fullName}</p>
        </div>
      </Button>
    </div>
  );
};
