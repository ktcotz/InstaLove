import { useQuery } from "@tanstack/react-query";
import { getStoriesByProfileID } from "../services/services";

export type GetProfileStoriesData = { profileID?: string; userID?: string };

export const useGetProfileStories = ({
  profileID,
  userID,
}: GetProfileStoriesData) => {
  const { data, isLoading } = useQuery({
    queryKey: ["stories", profileID, userID],
    queryFn: () => getStoriesByProfileID({ profileID, userID }),
    enabled: !!userID && !!profileID,
  });

  return { data: data?.parsed, watched: data?.watched, isLoading } as const;
};
