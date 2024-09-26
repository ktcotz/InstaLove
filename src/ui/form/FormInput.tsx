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
    "peer w-full dark:bg-stone-950 rounded-md border pl-4 pt-5 pb-2 pr-12 text-stone-950 transition-all dark:text-stone-50";

  const className = twMerge(
    base,
    isError
      ? "border-red-500 dark:border-red-400"
      : "border-stone-300 dark:border-stone-50"
  );

  return <input {...rest} ref={ref} className={className} />;
});
