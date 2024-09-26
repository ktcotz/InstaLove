import { useQuery } from "@tanstack/react-query";
import { getAllNestedStories } from "../services/services";

export type NestedStoriesData = {
  user_id: string;
};

export const useGetAllNestedStories = ({ user_id }: NestedStoriesData) => {
  const { data, isLoading } = useQuery({
    queryKey: ["nested-stories", user_id],
    queryFn: () => getAllNestedStories({ user_id }),
  });

  return { data, isLoading } as const;
};
