import { useContext } from "react";
import { NavigationContext } from "./NavigationContext";

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);

  if (context === null) {
    throw new Error("Can't use navigation context without provider");
  }

  return context;
};
