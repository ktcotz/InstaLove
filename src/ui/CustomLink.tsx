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
  | "post-user"
  | "post-avatar"
  | "notification"
  | "reel"
  | "explore"
  | "mobile-notification";

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
      "rounded-sm flex items-center justify-center bg-blue-600 px-3 py-1 sm:px-4 sm:py-2 hover:bg-blue-700 transition text-stone-50 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-600",
    logo: "inline-block",
    text: "text-stone-600 flex items-center justify-center gap-2 hover:text-stone-800 focus:text-stone-800 transition dark:text-stone-50 focus:dark:text-stone-100 focus:hover:text-stone-100",
    link: "font-semibold text-blue-700 hover:text-blue-800 transition dark:text-blue-500 hover:dark-text-blue-600",
    ["small-text"]:
      "text-sm text-stone-800 hover:text-stone-900 dark:text-stone-50 hover:dark:text-stone-100",
    ["small-logo"]: "text-2xl",
    navigation:
      "flex items-center gap-4 p-3 hover:bg-stone-100 transition group dark:text-stone-50 hover:dark:text-stone-950",
    avatar:
      "w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center",
    ["avatar-name"]: "text-base text-stone-950 font-medium dark:text-stone-50",
    ["all-profiles"]:
      "text-stone-800 hover:text-stone-950 text-sm  font-bold transition",
    ["profile-details"]:
      "text-stone-950 py-4 px-2 sm:p-6 flex items-center justify-center gap-2 dark:text-stone-50",
    ["post-user"]:
      "text-xs text-stone-900 hover:text-stone-950 transition font-semibold",
    ["post-avatar"]: "w-6 h-6 rounded-full",
    notification: "flex items-center gap-3",
    reel: "text-stone-50 transition hover:text-stone-100",
    explore: "",
    "mobile-notification": "text-2xl relative ",
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
      end
    >
      {children}
    </NavLink>
  );
};
