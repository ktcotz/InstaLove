import { ReactNode, useEffect, useRef } from "react";
import { ModalOverlay } from "./ModalOverlay";
import { useModal } from "./ModalContext/useModal";
import { Modal } from "./Modal";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { NavigationType, useLocation, useNavigate } from "react-router";
import { router } from "../../App";

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
  const { close, opened, reset } = useModal();
  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (opened.length > 0) {
      router.subscribe((state) => {
        if (state.historyAction === NavigationType.Pop) {
          reset();
        }
      });
    }
  }, [location.pathname, navigate, reset, opened.length]);

  useEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      close();
    }
  });

  useOnClickOutside(ref, (ev) => {
    if (!(ev.target instanceof HTMLElement)) return;

    if (ev.target === parentRef.current) {
      close();
    }
  });

  if (opened.length === 0) return null;

  if (!opened.includes(manageClass)) return;

  return (
    <ModalOverlay>
      {!fullScreen && <Modal.Close />}
      <div className="grow flex flex-col" ref={parentRef}>
        <div ref={ref} className={parentClass}>
          {children}
        </div>
      </div>
    </ModalOverlay>
  );
};
