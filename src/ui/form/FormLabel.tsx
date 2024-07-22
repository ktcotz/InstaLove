import { HTMLAttributes, ReactNode } from "react";

type FormLabelProps = {
  children: ReactNode;
  id: string;
};

export const FormLabel = ({
  children,
  id,
  ...rest
}: FormLabelProps & HTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      htmlFor={id}
      className="absolute left-0 top-1/2 -translate-y-1/2 px-2 text-sm text-stone-500 transition-all  peer-valid:top-0 peer-valid:rounded-md peer-valid:bg-stone-300 peer-valid:text-stone-900  peer-focus:top-0 peer-focus:rounded-md peer-focus:bg-stone-300 peer-focus:px-2 peer-focus:text-stone-900"
      {...rest}
    >
      {children}
    </label>
  );
};
