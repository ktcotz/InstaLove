import { ReactNode } from "react";

type FormErrorProps = {
  children: ReactNode;
};

export const FormError = ({ children }: FormErrorProps) => {
  return (
    <p className="ml-4 mt-2 text-sm text-red-700 transition-all animate-[formErrorFade_0.4s]">
      {children}
    </p>
  );
};
