import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNotification } from "../services/services";
import { UserID } from "../../authentication/services/types";

export const useAddNotification = ({ user_id }: UserID) => {
  const queryClient = useQueryClient();

  const { mutate: notify } = useMutation({
    mutationFn: addNotification,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", user_id] });
      queryClient.invalidateQueries({
        queryKey: ["unread-notifications", user_id],
      });
    },
  });

  return { notify } as const;
};
