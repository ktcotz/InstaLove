import { cloneElement, ReactElement, ReactNode } from "react";
import { useModal } from "./ModalContext/useModal";

type ModalOpenProps = {
  children: ReactNode;
};

export const ModalOpen = ({ children }: ModalOpenProps) => {
  const { open } = useModal();

  return cloneElement(children as ReactElement, {
    onClick: open,
  });
};
