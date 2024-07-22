import { ReactNode } from "react";

type FormIconsProps = {
  children: ReactNode;
};

export const FormIcons = ({ children }: FormIconsProps) => {
  return (
    <div className="absolute right-4 top-1/2 z-10 flex -translate-y-1/2 items-center gap-2 ">
      {children}
    </div>
  );
};
