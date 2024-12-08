import { useContext } from "react";
import { MessagesContext } from "./MessagesContext";

export const useMessages = () => {
  const context = useContext(MessagesContext);

  if (context === null) {
    throw new Error("Can't use messages context without provider!");
  }

  return context;
};
