import { useQuery } from "@tanstack/react-query";
import { getStoriesByProfileID } from "../services/services";

export type GetProfileStoriesData = { profileID: string };

export const useGetProfileStories = ({ profileID }: GetProfileStoriesData) => {
  const { data, isLoading } = useQuery({
    queryKey: ["stories", profileID],
    queryFn: () => getStoriesByProfileID({ profileID }),
  });

  return { data, isLoading } as const;
};
