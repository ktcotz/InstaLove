import { createContext, ReactNode, useState } from "react";

type ModalContextState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const ModalContext = createContext<ModalContextState | null>(null);

type ModalContextProviderProps = {
  children: ReactNode;
};

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};
