import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addStorieToWatched } from "../services/services";

export const useAddWatched = () => {
  const queryClient = useQueryClient();

  const { mutate: addWatchedStorie } = useMutation({
    mutationFn: addStorieToWatched,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });

  return { addWatchedStorie };
};
