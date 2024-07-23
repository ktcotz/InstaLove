import { forwardRef, InputHTMLAttributes } from "react";

type FormInputProps = {
  isError?: string;
};

export const FormInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & FormInputProps
>(({ isError, ...rest }, ref) => {
  return (
    <input
      {...rest}
      ref={ref}
      className={`peer w-full rounded-md border border-stone-300 pl-4 pt-5 pb-2 pr-12 text-stone-950 transition-all ${
        isError ? "border-red-500" : ""
      }`}
    />
  );
});
