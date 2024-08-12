import { CustomLink } from "../../ui/CustomLink";
import { useNavigationContext } from "../navigation/context/useNavigationContext";
import { Profile } from "../profile/schema/ProfilesSchema";
import { useAddUserSearch } from "./mutations/useAddUserSearch";

type SearchUserProps = {
  currentID?: string;
};

export const SearchUser = ({
  user_name,
  avatar_url,
  fullName,
  user_id,
  currentID,
}: Profile & SearchUserProps) => {
  const { close } = useNavigationContext();
  const { addSearch } = useAddUserSearch(currentID);

  const handleNavigation = () => {
    if (!currentID) return;

    addSearch({ search_user_id: user_id, user_id: currentID });
    close();
  };

  return (
    <CustomLink
      modifier="navigation"
      to={`/dashboard/${user_name}`}
      onClick={handleNavigation}
    >
      <div className="flex items-center gap-3">
        <img
          src={avatar_url}
          alt={user_name}
          width={32}
          height={32}
          className="rounded-full w-8 h-8"
        />
        <div>
          <h2 className="font-semibold text-sm">{user_name}</h2>
          <p className="text-sm text-stone-600">{fullName}</p>
        </div>
      </div>
    </CustomLink>
  );
};
