import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createChat } from "../services/services";
import { useNavigate } from "react-router";
import { useAuth } from "../../authentication/context/useAuth";

export const useCreateChat = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: create, isPending } = useMutation({
    mutationFn: createChat,

    onSuccess: (data) => {
      if (Number.isInteger(data)) {
        navigate(`/dashboard/messages/${data}`);
      }

      if (data.id) {
        navigate(`/dashboard/messages/${data.id}`);
      }

      queryClient.invalidateQueries({ queryKey: ["chats", user?.id] });
    },
  });

  return { create, isPending };
};
