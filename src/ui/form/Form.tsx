import { ReactNode } from "react";
import { FormError } from "./FormError";
import { FormInput } from "./FormInput";
import { FormInputContainer } from "./FormInputContainer";
import { FormItem } from "./FormItem";
import { FormLabel } from "./FormLabel";
import { FormSubmit } from "./FormSubmit";
import { FormIcons } from "./FormIcons";
import { FormTogglePassword } from "./FormTogglePassword";

type FormProps = {
  children: ReactNode;
  onSubmit: () => void;
};

export const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form className="mb-8 flex flex-col gap-4 w-full" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

Form.Submit = FormSubmit;
Form.Label = FormLabel;
Form.Input = FormInput;
Form.InputContainer = FormInputContainer;
Form.Item = FormItem;
Form.Error = FormError;
Form.Icons = FormIcons;
Form.TogglePassword = FormTogglePassword;
