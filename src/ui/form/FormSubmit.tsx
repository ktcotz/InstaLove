import { ReactNode } from "react";
import { Button } from "../Button";

type FormSubmitProps = {
  children: ReactNode;
};

export const FormSubmit = ({ children }: FormSubmitProps) => {
  return (
    <Button type="submit" modifier="submit">
      {children}
    </Button>
  );
};
