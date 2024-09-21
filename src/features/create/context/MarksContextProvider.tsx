import { createContext, ReactNode, useState } from "react";
import { MarkData } from "../../mark/Mark";

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
  addMark: (mark: MarkData & ID) => void;
  marks: (MarkData & ID)[];
  resetMarks: () => void;
};

export const MarksContext = createContext<MarksContextState | null>(null);

export const MarksContextProvider = ({
  children,
}: MarksContextProviderProps) => {
  const [marks, setMarks] = useState<(MarkData & ID)[]>([]);
  const [open, setOpen] = useState(false);

  const removeMark = (id: number) => {
    setMarks(marks.filter((mark) => mark.id !== id));
  };

  const addMark = (mark: MarkData & ID) => {
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
