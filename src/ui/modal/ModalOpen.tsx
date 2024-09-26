import { cloneElement, ReactElement, ReactNode } from "react";
import { useModal } from "./ModalContext/useModal";

type ModalOpenProps = {
  children: ReactNode;
  openClass: string;
};

export const ModalOpen = ({ children, openClass }: ModalOpenProps) => {
  const { open } = useModal();

  return cloneElement(children as ReactElement, {
    onClick: () => open(openClass),
  });
};
