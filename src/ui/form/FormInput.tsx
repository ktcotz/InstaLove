import { forwardRef, InputHTMLAttributes } from "react";

export const FormInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ ...rest }, ref) => {
  return (
    <input
      {...rest}
      ref={ref}
      className="peer w-full rounded-md border border-stone-300 pl-4 pt-5 pb-2 pr-12 text-stone-950 transition-all "
    />
  );
});
