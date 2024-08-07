import { useQuery } from "@tanstack/react-query";
import { Bookmark } from "../mutations/useBookmark";
import { getBookmark } from "../services/services";

export const useGetBookmark = ({ user_id, post_id, type }: Bookmark) => {
  const { data: bookmarks = [], isLoading } = useQuery({
    queryKey: ["bookmarks", user_id, post_id],
    queryFn: () => getBookmark({ user_id, post_id, type }),
    enabled: !!user_id,
  });

  return { bookmarks, isLoading } as const;
};
