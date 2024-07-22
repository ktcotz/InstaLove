import { ReactNode } from "react";

type FormInputContainerProps = {
  children: ReactNode;
};

export const FormInputContainer = ({ children }: FormInputContainerProps) => {
  return <div className="relative">{children}</div>;
};
