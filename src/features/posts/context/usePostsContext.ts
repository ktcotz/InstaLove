import { useContext } from "react";
import { PostsContext } from "./PostsContext";

export const usePostsContext = () => {
  const context = useContext(PostsContext);

  if (context === null) {
    throw new Error("Can't use a posts context without provider!");
  }

  return context;
};
