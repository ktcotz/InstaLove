import { ReactNode, useRef } from "react";
import { ModalOverlay } from "./ModalOverlay";
import { useModal } from "./ModalContext/useModal";
import { Modal } from "./Modal";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

type ModalContentProps = {
  children: ReactNode;
  parentClass: string;
};

export const ModalContent = ({ children, parentClass }: ModalContentProps) => {
  const { isOpen, close } = useModal();
  const ref = useRef<HTMLDivElement>(null);

  useEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      close();
    }
  });

  useOnClickOutside(ref, close);

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <Modal.Close />

      <div className="min-h-screen">
        <div ref={ref} className={parentClass}>
          {children}
        </div>
      </div>
    </ModalOverlay>
  );
};
