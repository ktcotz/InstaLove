import { createContext, ReactNode, useState } from "react";

export type NavigationComponent = "search" | "notifications";

type NavigationContextState = {
  open: boolean;
  toggleOpen: (openComponent: NavigationComponent) => void;
  component: NavigationComponent | null;
};

export const NavigationContext = createContext<NavigationContextState | null>(
  null
);

type NavigationContextProviderProps = {
  children: ReactNode;
};

export const NavigationContextProvider = ({
  children,
}: NavigationContextProviderProps) => {
  const [open, setOpen] = useState(false);
  const [component, setComponent] = useState<NavigationComponent | null>(null);

  const toggleOpen = (openComponent: NavigationComponent) => {
    const isOpen = component !== openComponent;

    setOpen(isOpen);
    setComponent(isOpen === false ? null : openComponent);
  };

  return (
    <NavigationContext.Provider value={{ open, toggleOpen, component }}>
      {children}
    </NavigationContext.Provider>
  );
};
