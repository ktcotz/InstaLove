import { useQuery } from "@tanstack/react-query";
import { getBookmarks } from "../services/services";
import { UserID } from "../../authentication/services/types";

export const useGetBookmarks = ({ user_id }: UserID) => {
  const { data: bookmarks, isLoading } = useQuery({
    queryKey: ["bookmarks", user_id],
    queryFn: () => getBookmarks({ user_id }),
  });

  return { bookmarks, isLoading } as const;
};
