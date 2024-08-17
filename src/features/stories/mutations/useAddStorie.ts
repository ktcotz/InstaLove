import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomError } from "../../../utils/CustomErrors";
import toast from "react-hot-toast";
import { addStorie } from "../services/services";

export const useAddStorie = () => {
  const queryClient = useQueryClient();

  const { mutate: createStorie, isPending: isCreatingStorie } = useMutation({
    mutationFn: addStorie,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },

    onError: (err: CustomError) => {
      toast.error(err.message);
    },
  });

  return { createStorie, isCreatingStorie } as const;
};
