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
  | "suggestion"
  | "explore"
  | "explore-back"
  | "video-play"
  | "mark"
  | "avatar"
  | "hover"
  | "notification"
  | "watched"
  | "watched-storie"
  | "follow"
  | "mobile-create"
  | "music"
  | "add-chat"
  | "active"
  | "delete";

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
    ["add-chat"]:
      "w-full justify-center flex items-center text-sm text-stone-50 bg-blue-500 py-3 px-4 font-medium rounded-full",
    ["mobile-create"]:
      "flex items-center gap-2 text-sm text-stone-50 bg-blue-500 py-2 px-4 font-medium rounded-full",
    delete: "text-red-600 hover:text-red-700 transition",
    primary:
      "w-full flex items-center justify-center bg-red-600 rounded-md bg-secondary text-slate-50 py-3 hover:bg-red-500 transition md:px-8 focus:outline-none focus:ring focus:ring-red-500 focus:ring-offset-1 focus:ring-offset-primary",
    follow:
      "flex items-center justify-center py-1.5 px-3 sm:py-3 bg-blue-600 border rounded-md text-stone-50 transition-all hover:bg-stone-100 hover:text-blue-700 hover:border-stone-300 sm:px-4",
    submit:
      "flex items-center justify-center py-3 bg-blue-600 border rounded-md text-stone-50 transition-all hover:bg-stone-100 hover:text-blue-700 hover:border-stone-300 px-4",
    text: "text-stone-600 flex items-center justify-center gap-2 hover:text-blue-600 transition dark:text-stone-200 hover:dark:text-blue-500",
    navigation:
      "relative flex items-center gap-4 p-3 hover:bg-stone-200 transition group w-full dark:text-stone-50 hover:dark:text-stone-950",
    storie:
      "w-14 h-14 rounded-full flex items-center justify-center overflow-hidden h-full w-fit bg-gradient-to-r from-pink-400 to-blue-400 p-[2px]",
    ["watched-storie"]:
      "w-14 h-14 rounded-full flex items-center justify-center overflow-hidden h-full w-fit bg-gradient-to-r from-stone-300 to-stone-300 dark:from-stone-700 dark:to-stone-700 p-[2px]",
    close: "group dark:text-stone-50",
    link: "text-blue-600 hover:text-blue-700 transition text-sm font-bold dark:text-blue-400 hover:dark:text-blue-500",
    ["add-user"]:
      "bg-blue-600 text-stone-50 rounded-md p-2 w-full flex items-center justify-center gap-1",
    ["all-profiles"]:
      "text-stone-900 hover:text-stone-950 font-bold transition dark:text-stone-100 hover:dark:text-stone-50",
    pagination: "text-stone-50 bg-blue-600 p-2 rounded-md",
    reel: "bg-black/40 p-4 rounded-full text-2xl text-stone-50",
    suggestion: "flex items-center gap-3 w-full p-2",
    explore:
      "col-start-1 -col-end-1 row-start-3 w-full sm:row-start-1 sm:-row-end-1 sm:col-start-1 sm:col-end-2",
    ["explore-back"]:
      "col-start-1 -col-end-1 row-start-3 w-full sm:row-start-1 sm:-row-end-1 sm:col-start-3",
    ["video-play"]:
      "bg-black/80 p-6 rounded-full text-3xl text-stone-50 animate-play-video",
    mark: "text-left p-3",
    hover: "flex flex-col",
    notification: "flex items-center gap-3",
    active: "flex flex-col items-center gap-2",
    music: "absolute top-1/2 right-0 -translate-y-1/2 -translate-x-2",
    watched:
      "rounded-full  p-[2px] flex items-center justify-center h-full w-fit bg-gradient-to-r dark:from-stone-700 dark:to-stone-700 from-stone-300 to-stone-300",
    avatar:
      "rounded-full  p-[2px] flex items-center justify-center h-full w-fit bg-gradient-to-r from-pink-400 to-blue-400",
  };

  const className = twMerge(base, modifier && modifierObject[modifier]);

  return (
    <button ref={ref} className={className} {...rest}>
      {children}
    </button>
  );
});
