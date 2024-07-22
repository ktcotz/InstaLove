import { forwardRef, InputHTMLAttributes } from "react";

export const FormInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement>
>(({ ...rest }, ref) => {
  return (
    <input
      {...rest}
      ref={ref}
      className="peer w-full rounded-md border border-stone-300 p-3 pr-12 text-stone-950 transition-all "
    />
  );
});
