import { ReactNode } from "react";
import { ModalOverlay } from "./ModalOverlay";
import { useModal } from "./ModalContext/useModal";

type ModalContentProps = {
  children: ReactNode;
};

export const ModalContent = ({ children }: ModalContentProps) => {
  const { isOpen } = useModal();

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <div>{children}</div>
    </ModalOverlay>
  );
};
