import { useQuery } from "@tanstack/react-query";
import { getYoutubeTitle } from "../services/services";

export const useGetYoutubeTitle = (youtube_id: string | null) => {
  const { data: title, isLoading } = useQuery({
    queryKey: ["youtube-title", youtube_id],
    queryFn: () => getYoutubeTitle({ youtube_id }),
    enabled: !!youtube_id,
  });

  return { title, isLoading } as const;
};
