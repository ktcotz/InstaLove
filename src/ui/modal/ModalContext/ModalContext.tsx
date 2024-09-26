import { createContext, ReactNode, useState } from "react";

type ModalContextState = {
  open: (openClass: string) => void;
  close: () => void;
  opened: string[];
};

export const ModalContext = createContext<ModalContextState | null>(null);

type ModalContextProviderProps = {
  children: ReactNode;
};

export const ModalContextProvider = ({
  children,
}: ModalContextProviderProps) => {
  const [opened, setOpened] = useState<string[]>([]);

  const open = (openClass: string) => {
    document.documentElement.classList.add("no-scroll");
    const newOpened = [...opened, openClass];

    setOpened(newOpened);
  };

  const close = () => {
    const newOpened = opened.slice(0, -1);

    if (newOpened.length === 0) {
      document.documentElement.classList.remove("no-scroll");
    }

    setOpened(newOpened);
  };

  return (
    <ModalContext.Provider value={{ open, close, opened }}>
      {children}
    </ModalContext.Provider>
  );
};
