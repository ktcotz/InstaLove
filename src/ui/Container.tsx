import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return (
    <div className="border border-stone-300 rounded-md p-10 flex items-center justify-center flex-col animate-fade-bottom lg:animate-fade-right w-4/5">
      {children}
    </div>
  );
};
