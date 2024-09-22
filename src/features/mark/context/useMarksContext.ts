import { useContext } from "react";
import { MarksContext } from "./MarksContextProvider";

export const useMarksContext = () => {
  const context = useContext(MarksContext);

  if (context === null) {
    throw new Error("Can't use a Marks Context without provider!");
  }

  return context;
};
