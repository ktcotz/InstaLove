import { useUserByID } from "../authentication/queries/useUserByID";
import { SearchUser } from "./SearchUser";

type SearchQueryProfileProps = {
  search_user: string;
};

export const SearchQueryProfile = ({
  search_user,
}: SearchQueryProfileProps) => {
  const { user } = useUserByID(search_user);

  if (!user) return null;

  return <SearchUser {...user} />;
};
