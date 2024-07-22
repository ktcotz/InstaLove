import { useContext } from "react";
import { FormContext } from "./FormContext";

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (context === null) {
    throw new Error("Context is without Form Provider!");
  }

  return context;
};
