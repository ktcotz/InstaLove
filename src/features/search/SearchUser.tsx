import { IoClose } from "react-icons/io5";
import { Button } from "../../ui";
import { CustomLink } from "../../ui/CustomLink";
import { useNavigationContext } from "../navigation/context/useNavigationContext";
import { Profile } from "../profile/schema/ProfilesSchema";
import { useAddUserSearch } from "./mutations/useAddUserSearch";
import { useTranslation } from "react-i18next";
import { useDeleteIndividualUserSearch } from "./mutations/useDeleteIndividualUserSearch";
import { MarkDTO } from "../mark/schema/MarkSchema";
import { useAuth } from "../authentication/context/useAuth";

type SearchUserProps = {
  currentID?: string;
  isMarkable?: boolean;
  handleChoosenUser?: (mark: MarkDTO) => void;
  position?: { x: number; y: number };
};

export const SearchUser = ({
  user_name,
  avatar_url,
  fullName,
  user_id,
  currentID,
  handleChoosenUser,
  isMarkable,
  position,
}: Profile & SearchUserProps) => {
  const { user } = useAuth();

  const { close } = useNavigationContext();
  const { addSearch } = useAddUserSearch(currentID);
  const { deleteUser } = useDeleteIndividualUserSearch(user?.id);
  const { t } = useTranslation();

  const handleNavigation = () => {
    if (!currentID) return;

    addSearch({ search_user_id: user_id, user_id: currentID });
    close();
  };

  const handleDelete = () => {
    if (!user) return;

    deleteUser({ search_user_id: user_id, user_id: user.id });
  };

  if (isMarkable) {
    return (
      <Button
        onClick={(e) => {
          e.stopPropagation();
          if (!position) return;

          handleChoosenUser?.({ name: user_name, ...position });
        }}
        modifier="mark"
      >
        <div className="flex items-center gap-3 w-full">
          <img
            src={avatar_url}
            alt={user_name}
            width={32}
            height={32}
            className="rounded-full w-8 h-8"
          />
          <div>
            <h2 className="font-semibold text-sm dark:text-stone-50">
              {user_name}
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-50">
              {fullName}
            </p>
          </div>
        </div>
      </Button>
    );
  }

  return (
    <CustomLink
      modifier="search"
      to={`/dashboard/${user_name}`}
      onClick={handleNavigation}
    >
      <div className="flex items-center gap-3 w-full">
        <img
          src={avatar_url}
          alt={user_name}
          width={32}
          height={32}
          className="rounded-full w-8 h-8"
        />
        <div>
          <h2 className="font-semibold text-sm">{user_name}</h2>
          <p className="text-sm text-stone-600 dark:text-stone-50">
            {fullName}
          </p>
        </div>
        {!currentID && (
          <div className="ml-auto">
            <Button
              modifier="close"
              aria-label={t("search.delete")}
              onClick={(ev) => {
                ev.stopPropagation();
                ev.preventDefault();
                handleDelete();
              }}
            >
              <IoClose aria-label={t("search.delete")} />
            </Button>
          </div>
        )}
      </div>
    </CustomLink>
  );
};
