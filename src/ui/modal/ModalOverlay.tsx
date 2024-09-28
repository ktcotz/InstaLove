import { ReactNode } from "react";
import { createPortal } from "react-dom";
import FocusTrap from "focus-trap-react";

type ModalOverlayProps = {
  children: ReactNode;
};

export const ModalOverlay = ({ children }: ModalOverlayProps) => {
  return createPortal(
    <FocusTrap>
      <div className="fixed top-0 left-0 min-h-screen w-full z-[9999] bg-stone-50/75 backdrop-blur-sm  flex flex-col lg:py-8 dark:bg-stone-950/75">
        {children}
      </div>
    </FocusTrap>,
    document.querySelector("#root")!
  );
};
