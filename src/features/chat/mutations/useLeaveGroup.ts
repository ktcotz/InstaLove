import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveGroup } from "../services/services";
import { useAuth } from "../../authentication/context/useAuth";

export const useLeaveGroup = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: leaveGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chats", user?.id],
      });
    },
  });

  return { mutate, isPending } as const;
};
