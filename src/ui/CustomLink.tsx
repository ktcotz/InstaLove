import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";
import twMerge from "clsx";

type CustomLinkModifier = "primary" | "logo";

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
    logo: "",
  };

  const className = twMerge(base, modifiers[modifier]);

  return (
    <Link {...rest} className={className}>
      {children}
    </Link>
  );
};
