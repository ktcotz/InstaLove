import { createContext, ReactNode, useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

export type NavigationComponent = "search" | "notifications" | "create";

type NavigationContextState = {
  open: boolean;
  toggleOpen: (openComponent: NavigationComponent) => void;
  component: NavigationComponent | null;
  close: () => void;
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
  const isMatch = useMediaQuery("(max-width:768px)");

  const toggleOpen = (openComponent: NavigationComponent) => {
    const isOpen = component !== openComponent;

    setOpen(isOpen);
    setComponent(isOpen === false ? null : openComponent);
  };

  const close = () => {
    setOpen(false);
    setComponent(null);
  };

  useEffect(() => {
    if (isMatch) {
      setOpen(false);
      setComponent(null);
    }
  }, [isMatch]);

  return (
    <NavigationContext.Provider value={{ open, toggleOpen, component, close }}>
      {children}
    </NavigationContext.Provider>
  );
};
