import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import twMerge from "clsx";

type ButtonType =
  | "primary"
  | "submit"
  | "text"
  | "navigation"
  | "storie"
  | "close"
  | "link"
  | "add-user"
  | "all-profiles"
  | "pagination"
  | "reel"
  | "suggestion";

type ButtonProps = {
  children: ReactNode;
  modifier?: ButtonType;
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, modifier = "primary", ...rest }, ref) => {
  const base = "inline-block";

  const modifierObject: Record<ButtonType, string> = {
    primary:
      "w-full flex items-center justify-center bg-red-600 rounded-md bg-secondary text-slate-50 py-3 hover:bg-red-500 transition md:px-8 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-1 focus:ring-offset-primary",
    submit:
      "flex items-center justify-center py-3 bg-blue-600 border rounded-md text-stone-50 transition-all hover:bg-stone-100 hover:text-blue-700 hover:border-stone-300 px-4",
    text: "text-stone-600 flex items-center justify-center gap-2 hover:text-blue-600 transition",
    navigation:
      "relative flex items-center gap-4 p-3 hover:bg-stone-200 transition group w-full",
    storie:
      "w-14 h-14 rounded-full flex items-center justify-center overflow-hidden border-2 border-blue-600 p-[2px]",
    close: "group",
    link: "text-blue-600 hover:text-blue-700 transition text-sm font-bold",
    ["add-user"]:
      "bg-blue-600 text-stone-50 rounded-md p-2 w-full flex items-center justify-center gap-1",
    ["all-profiles"]:
      "text-stone-900 hover:text-stone-950 text-sm font-bold transition",
    pagination: "text-stone-900",
    reel: "bg-black/40 p-4 rounded-full text-2xl text-stone-50",
    suggestion: "flex items-center gap-3 w-full p-2",
  };

  const className = twMerge(base, modifier && modifierObject[modifier]);

  return (
    <button ref={ref} className={className} {...rest}>
      {children}
    </button>
  );
});
