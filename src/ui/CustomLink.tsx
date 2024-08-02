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
  | "navigation"
  | "avatar"
  | "avatar-name"
  | "all-profiles"
  | "profile-details"
  | "post-user";

type CustomLinkProps = {
  children: ReactNode;
  type?: "link" | "active-link";
  modifier?: CustomLinkModifier;
  activeClass?: string;
};

export const CustomLink = ({
  children,
  modifier = "primary",
  type = "link",
  activeClass,
  ...rest
}: CustomLinkProps & LinkProps) => {
  const base = "font-base";

  const modifiers: Record<CustomLinkModifier, string> = {
    primary:
      "rounded-sm flex items-center justify-center bg-blue-600 px-3 py-1 sm:px-4 sm:py-2 hover:bg-blue-700 transition text-stone-50",
    logo: "inline-block",
    text: "text-stone-600 flex items-center justify-center gap-2 hover:text-blue-600 transition",
    link: "text-blue-600 hover:text-blue-700 transition",
    ["small-text"]: "text-sm text-stone-800",
    ["small-logo"]: "text-2xl",
    navigation:
      "flex items-center gap-4 p-3 hover:bg-stone-200 transition group",
    avatar: "w-12 h-12 rounded-full border-2 border-stone-300",
    ["avatar-name"]: "text-base text-stone-950 font-medium",
    ["all-profiles"]:
      "text-stone-900 hover:text-stone-950 text-sm  font-bold transition",
    ["profile-details"]:
      "text-stone-950 p-6 flex items-center justify-center gap-2",
    ["post-user"]:
      "text-stone-900 hover:text-stone-950 transition font-semibold",
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
        `${isActive ? twMerge(className, activeClass) : className}`
      }
    >
      {children}
    </NavLink>
  );
};
