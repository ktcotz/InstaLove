import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userObserver } from "../services/services";

export type ObserveUserData = {
  user_id?: string;
  observe_id?: string;
  user_name?: string;
  observer_name?: string;
};

export const useObservation = ({ observe_id, user_id }: ObserveUserData) => {
  const queryClient = useQueryClient();

  const { mutate: observer, isPending: isObserving } = useMutation({
    mutationFn: userObserver,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["observe", user_id, observe_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["observations-by", user_id],
      });
      queryClient.invalidateQueries({
        queryKey: ["observations-on", observe_id],
      });
    },
  });

  return { observer, isObserving } as const;
};
