import { forwardRef, InputHTMLAttributes } from "react";
import twMerge from "clsx";

type FormInputProps = {
  isError?: string;
};

export const FormInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & FormInputProps
>(({ isError, ...rest }, ref) => {
  const base =
    "peer w-full rounded-md border pl-4 pt-5 pb-2 pr-12 text-stone-950 transition-all";

  const className = twMerge(
    base,
    isError ? "border-red-500" : "border-stone-300"
  );

  return <input {...rest} ref={ref} className={className} />;
});
