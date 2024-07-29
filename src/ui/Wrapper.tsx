import { ReactNode } from "react";
import twMerge from "clsx";

type WrapperType = "primary" | "home" | "form" | "details" | "create";

type WrapperProps = {
  children: ReactNode;
  modifier?: WrapperType;
};

export const Wrapper = ({ children, modifier = "primary" }: WrapperProps) => {
  const base = "mx-auto px-4 w-full";

  const modifiers: Record<WrapperType, string> = {
    primary: "max-w-6xl",
    home: "max-w-xl lg:max-w-6xl",
    form: "max-w-lg",
    details: "max-w-4xl",
    create: "max-w-[400px] md:max-w-4xl",
  };

  const className = twMerge(base, modifiers[modifier]);
  return <div className={className}>{children}</div>;
};
