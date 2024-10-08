import { useQuery } from "@tanstack/react-query";
import { getAllStories } from "../services/services";

export type AllNonUserStories = {
  current?: string;
};

export const useGetAllStories = ({ current }: AllNonUserStories) => {
  const { data: stories, isLoading } = useQuery({
    queryKey: ["stories", current],
    queryFn: () => getAllStories({ current }),
    enabled: !!current,
  });

  return { stories, isLoading } as const;
};
