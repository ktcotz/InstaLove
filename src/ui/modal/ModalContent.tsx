import { ReactNode, useRef } from "react";
import { ModalOverlay } from "./ModalOverlay";
import { useModal } from "./ModalContext/useModal";
import { Modal } from "./Modal";
import { Wrapper } from "../Wrapper";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

type ModalContentProps = {
  children: ReactNode;
};

export const ModalContent = ({ children }: ModalContentProps) => {
  const { isOpen, close } = useModal();
  const ref = useRef(null);

  useOnClickOutside(ref, close);
  useEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      close();
    }
  });

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <Modal.Close />
      <div className="py-12" ref={ref}>
        {children}
      </div>
    </ModalOverlay>
  );
};
