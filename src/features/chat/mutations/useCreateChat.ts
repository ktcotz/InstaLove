import { useMutation } from "@tanstack/react-query";
import { createChat } from "../services/services";
import { useNavigate } from "react-router";

export const useCreateChat = () => {
  const navigate = useNavigate();

  const { mutate: create, isPending } = useMutation({
    mutationFn: createChat,

    onSuccess: (data) => {
      if (Number.isInteger(data)) {
        navigate(`/dashboard/messages/${data}`);
      }
    },
  });

  return { create, isPending };
};
