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
      className="absolute left-2 top-1/2 -translate-y-1/2 px-2 text-sm text-stone-900 transition-all  peer-valid:top-3 peer-focus:top-3 peer-focus:rounded-sm peer-valid:text-xs peer-focus:text-xs "
      {...rest}
    >
      {children}
    </label>
  );
};
