import { ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalOverlayProps = {
  children: ReactNode;
};

export const ModalOverlay = ({ children }: ModalOverlayProps) => {
  return createPortal(
    <div className="fixed top-0 left-0 h-full w-full z-50 bg-stone-50/95 backdrop-blur-sm p-4 flex flex-col lg:p-8">
      {children}
    </div>,
    document.querySelector("#modal")!
  );
};
