type DividerProps = {
  text?: string;
};

export const Divider = ({ text }: DividerProps) => {
  return (
    <div
      className={`h-[1px] bg-stone-200 relative ${text ? "w-full" : "w-2/4"}`}
    >
      {text && (
        <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-50 px-4 text-stone-500 uppercase text-sm">
          {text}
        </span>
      )}
      &nbsp;
    </div>
  );
};
