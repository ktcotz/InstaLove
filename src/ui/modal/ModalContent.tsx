import { ReactNode } from "react";
import { ModalOverlay } from "./ModalOverlay";
import { useModal } from "./ModalContext/useModal";
import { Modal } from "./Modal";
import { useEventListener } from "usehooks-ts";

type ModalContentProps = {
  children: ReactNode;
};

export const ModalContent = ({ children }: ModalContentProps) => {
  const { isOpen, close } = useModal();

  useEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      close();
    }
  });

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <Modal.Close />
      <div className="py-0 md:py-6 grow mt-14">{children}</div>
    </ModalOverlay>
  );
};
