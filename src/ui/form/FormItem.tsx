import { ReactNode } from "react";

type FormItemProps = {
  children: ReactNode;
};

export const FormItem = ({ children }: FormItemProps) => {
  return <div className="relative">{children}</div>;
};
