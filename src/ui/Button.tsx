import { ButtonHTMLAttributes, ReactNode } from "react";
import twMerge from "clsx";

type ButtonType =
  | "primary"
  | "submit"
  | "text"
  | "navigation"
  | "storie"
  | "close";

type ButtonProps = {
  children: ReactNode;
  modifier?: ButtonType;
};

export const Button = ({
  children,
  modifier = "primary",
  ...rest
}: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const base = "inline-block";

  const modifierObject: Record<ButtonType, string> = {
    primary:
      " rounded-sm bg-secondary text-slate-950 p-3 md:p-4 hover:bg-red-500 transition md:px-8 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-1 focus:ring-offset-primary",
    submit:
      "py-3 bg-blue-600 border rounded-md text-stone-50 transition-all hover:bg-stone-100 hover:text-blue-700 hover:border-stone-300",
    text: "text-stone-600 flex items-center justify-center gap-2 hover:text-blue-600 transition",
    navigation:
      "flex items-center gap-4 p-3 hover:bg-stone-200 transition group w-full",
    storie:
      "w-14 h-14 rounded-full flex items-center justify-center  overflow-hidden border border-blue-400 p-[2px]",
    close: "group",
  };

  const className = twMerge(base, modifier && modifierObject[modifier]);

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};
