import { useParams } from "react-router";
import { z } from "zod";

export const usePostsCategory = () => {
  const { category } = useParams();

  const parsed = z
    .object({
      category: z.enum(["posts", "reels", "bookmarks"]).default("posts"),
    })
    .safeParse({ category });

  return parsed.success ? parsed.data : { category: "posts" };
};
