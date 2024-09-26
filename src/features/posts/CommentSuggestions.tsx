import { useGetAllUsersByQuery } from "../search/query/useGetAllUsersByQuery";
import { SuggestionUser } from "./SuggestionUser";

type CommentSuggestionsProps = {
  query: string;
};

export const CommentSuggestions = ({ query }: CommentSuggestionsProps) => {
  const user_name = query.slice(query.indexOf("@") + 1);
  const { users } = useGetAllUsersByQuery(user_name);

  if (!users || users.length === 0) return null;

  return (
    <div className="absolute top-0 left-0 -translate-y-full border border-stone-300 bg-stone-50 dark:bg-stone-950 dark:border-stone-50 w-80 h-40 overflow-y-scroll">
      {users?.map((user) => (
        <SuggestionUser key={user.id} {...user} />
      ))}
    </div>
  );
};
