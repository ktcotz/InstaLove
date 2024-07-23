import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="border border-stone-300 rounded-md py-10 px-4 md:p-10 flex items-center justify-center flex-col">
      {children}
    </div>
  );
};
