import { useQuery } from "@tanstack/react-query";
import { UserID } from "../../authentication/services/services";
import { getBookmarks } from "../services/services";

export const useGetBookmarks = ({ user_id }: UserID) => {
  const { data: bookmarks, isLoading } = useQuery({
    queryKey: ["bookmarks", user_id],
    queryFn: () => getBookmarks({ user_id }),
  });

  return { bookmarks, isLoading } as const;
};
