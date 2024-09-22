import { createContext, ReactNode, useState } from "react";
import { MarkDTO } from "../schema/MarkSchema";

type MarksContextProviderProps = {
  children: ReactNode;
};

export type ID = {
  id: number;
};

type MarksContextState = {
  open: boolean;
  toggleOpen: () => void;
  removeMark: (id: number) => void;
  addMark: (mark: MarkDTO) => void;
  marks: MarkDTO[];
  resetMarks: () => void;
};

export const MarksContext = createContext<MarksContextState | null>(null);

export const MarksContextProvider = ({
  children,
}: MarksContextProviderProps) => {
  const [marks, setMarks] = useState<MarkDTO[]>([]);
  const [open, setOpen] = useState(false);

  const removeMark = (id: number) => {
    setMarks(marks.filter((mark) => mark.id !== id));
  };

  const addMark = (mark: MarkDTO) => {
    const isNameMarked = marks.find(
      (findedMark) => findedMark.name === mark.name
    );

    if (isNameMarked) return;

    setMarks((prevMark) => [...prevMark, mark]);
  };

  const toggleOpen = () => {
    setOpen((prevOpenState) => !prevOpenState);
  };

  const resetMarks = () => {
    setMarks([]);
    setOpen(false);
  };

  return (
    <MarksContext.Provider
      value={{ open, toggleOpen, removeMark, addMark, marks, resetMarks }}
    >
      {children}
    </MarksContext.Provider>
  );
};
