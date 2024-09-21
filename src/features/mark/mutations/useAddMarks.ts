import { useMutation } from "@tanstack/react-query";
import { addMarks } from "../services/services";

export const useAddMarks = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: addMarks,
  });

  return { mutate, isPending } as const;
};
