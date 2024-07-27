import { ModalContent } from "./ModalContent";
import { ModalClose } from "./ModalClose";
import { ReactNode } from "react";
import { ModalContextProvider } from "./ModalContext/ModalContext";
import { ModalOpen } from "./ModalOpen";

type ModalProps = {
  children: ReactNode;
};

export const Modal = ({ children }: ModalProps) => {
  return <ModalContextProvider>{children}</ModalContextProvider>;
};

Modal.Content = ModalContent;
Modal.Close = ModalClose;
Modal.Open = ModalOpen;
