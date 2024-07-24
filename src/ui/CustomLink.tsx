import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";
import twMerge from "clsx";

export type CustomLinkModifier =
  | "primary"
  | "logo"
  | "small-logo"
  | "text"
  | "link"
  | "small-text";

type CustomLinkProps = {
  children: ReactNode;
  modifier?: CustomLinkModifier;
};

export const CustomLink = ({
  children,
  modifier = "primary",
  ...rest
}: CustomLinkProps & LinkProps) => {
  const base = "rounded-sm font-base";

  const modifiers: Record<CustomLinkModifier, string> = {
    primary:
      "bg-blue-600 px-3 py-1 sm:px-4 sm:py-2 hover:bg-blue-700 transition text-stone-50",
    logo: "inline-block",
    text: "text-stone-600 flex items-center justify-center gap-2 hover:text-blue-600 transition",
    link: "text-blue-600 hover:text-blue-700 transition",
    ["small-text"]: "text-sm text-stone-800",
    ["small-logo"]: "text-2xl",
  };

  const className = twMerge(base, modifiers[modifier]);

  return (
    <Link {...rest} className={className}>
      {children}
    </Link>
  );
};
