import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";
import twMerge from "clsx";

type CustomLinkModifier = "primary" | "logo" | "text" | "link" | "small-text";

type CustomLinkProps = {
  children: ReactNode;
  modifier?: CustomLinkModifier;
};

export const CustomLink = ({
  children,
  modifier = "primary",
  ...rest
}: CustomLinkProps & LinkProps) => {
  const base = "rounded-sm font-semibold";

  const modifiers: Record<CustomLinkModifier, string> = {
    primary: "bg-red-500",
    logo: "inline-block",
    text: "text-stone-600 flex items-center justify-center gap-2 hover:text-blue-600 transition",
    link: "text-blue-600 hover:text-blue-700 transition",
    ["small-text"]: "text-sm text-stone-800",
  };

  const className = twMerge(base, modifiers[modifier]);

  return (
    <Link {...rest} className={className}>
      {children}
    </Link>
  );
};
