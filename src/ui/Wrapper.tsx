import { ReactNode } from "react";
import twMerge from "clsx";

type WrapperType = "primary";

type WrapperProps = {
  children: ReactNode;
  modifier?: WrapperType;
};

export const Wrapper = ({ children, modifier = "primary" }: WrapperProps) => {
  const base = "mx-auto px-4 w-full";

  const modifiers: Record<WrapperType, string> = {
    primary: "max-w-6xl",
  };

  const className = twMerge(base, modifiers[modifier]);
  return <div className={className}>{children}</div>;
};
