import { ReactNode, useRef } from "react";
import { ModalOverlay } from "./ModalOverlay";
import { useModal } from "./ModalContext/useModal";
import { Modal } from "./Modal";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

type ModalContentProps = {
  children: ReactNode;
  parentClass: string;
  manageClass: string;
  fullScreen?: boolean;
};

export const ModalContent = ({
  children,
  parentClass,
  manageClass,
  fullScreen = false,
}: ModalContentProps) => {
  const { close, opened } = useModal();
  const ref = useRef<HTMLDivElement>(null);

  useEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      close();
    }
  });

  useOnClickOutside(ref, (ev) => {
    if (ev.target instanceof HTMLButtonElement) return;
    close();
  });

  if (opened.length === 0) return null;

  if (!opened.includes(manageClass)) return;

  return (
    <ModalOverlay>
      {!fullScreen && <Modal.Close />}
      <div className="grow flex flex-col">
        <div ref={ref} className={parentClass}>
          {children}
        </div>
      </div>
    </ModalOverlay>
  );
};
