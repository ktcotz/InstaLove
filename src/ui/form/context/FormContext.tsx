import { createContext, ReactNode, useCallback, useState } from "react";

type FormContextState = {
  isPasswordShow: boolean;
  togglePassword: () => void;
};

export const FormContext = createContext<FormContextState | null>(null);

type FormContextProviderProps = {
  children: ReactNode;
};

export const FormContextProvider = ({ children }: FormContextProviderProps) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const togglePassword = useCallback(() => {
    setIsPasswordShow((prevPasswordShowState) => !prevPasswordShowState);
  }, []);

  return (
    <FormContext.Provider value={{ isPasswordShow, togglePassword }}>
      {children}
    </FormContext.Provider>
  );
};
