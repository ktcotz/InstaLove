import { ReactNode } from "react";
import { useModal } from "./ModalContext/useModal";
import { createPortal } from "react-dom";

type ModalOverlayProps = {
  children: ReactNode;
};

export const ModalOverlay = ({ children }: ModalOverlayProps) => {
  const { close } = useModal();

  return createPortal(
    <div
      className="fixed top-0 left-0 h-full w-full z-50 bg-stone-50/95 backdrop-blur-sm"
      onClick={close}
    >
      {children}
    </div>,
    document.querySelector("#modal")!
  );
};
