import { useMutation, useQueryClient } from "@tanstack/react-query";
import { manageBookmark } from "../services/services";

export type Bookmark = {
  user_id?: string;
  post_id: number;
};

export const useBookmark = ({ user_id, post_id }: Bookmark) => {
  const queryClient = useQueryClient();

  const { mutate: bookmarking, isPending: isBookmarking } = useMutation({
    mutationFn: ({ post_id, user_id }: Bookmark) =>
      manageBookmark({ post_id, user_id }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", user_id, post_id],
      });
    },
  });

  return { bookmarking, isBookmarking };
};
