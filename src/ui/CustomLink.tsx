import { ReactNode } from "react";
import { LinkProps } from "react-router-dom";
import twMerge from "clsx";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

export type CustomLinkModifier =
  | "primary"
  | "logo"
  | "small-logo"
  | "text"
  | "link"
  | "small-text"
  | "navigation";

type CustomLinkProps = {
  children: ReactNode;
  type?: "link" | "active-link";
  modifier?: CustomLinkModifier;
};

export const CustomLink = ({
  children,
  modifier = "primary",
  type = "link",
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
    navigation:
      "flex items-center gap-4 p-3 hover:bg-stone-200 transition group",
  };

  const className = twMerge(base, modifiers[modifier]);

  return type === "link" ? (
    <Link {...rest} className={className}>
      {children}
    </Link>
  ) : (
    <NavLink
      {...rest}
      className={({ isActive }) =>
        `${
          isActive
            ? twMerge(className, "bg-stone-200 font-semibold")
            : className
        }`
      }
    >
      {children}
    </NavLink>
  );
};
