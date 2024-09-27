import { ReactNode, useRef } from "react";
import { ModalOverlay } from "./ModalOverlay";
import { useModal } from "./ModalContext/useModal";
import { Modal } from "./Modal";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

type ModalContentProps = {
  children: ReactNode;
  parentClass: string;
  manageClass: string;
};

export const ModalContent = ({
  children,
  parentClass,
  manageClass,
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
      <Modal.Close />

      <div className="grow flex flex-col">
        <div ref={ref} className={parentClass}>
          {children}
        </div>
      </div>
    </ModalOverlay>
  );
};
