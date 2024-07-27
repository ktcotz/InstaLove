import { useContext } from "react";
import { ModalContext } from "./ModalContext";

export const useModal = () => {
  const context = useContext(ModalContext);

  if (context === null) {
    throw new Error("Can't use modal context without provider!");
  }

  return context;
};
