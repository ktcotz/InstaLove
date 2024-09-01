import { ReactNode } from "react";
import { MemoryRouter } from "react-router";

type RouterWrapperProps = {
  children: ReactNode;
};

export const CustomRouterWrapper = ({ children }: RouterWrapperProps) => {
  return <MemoryRouter>{children}</MemoryRouter>;
};
