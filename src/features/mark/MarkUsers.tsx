import { useRef, useState } from "react";
import useMousePosition from "../../hooks/useMousePosition";
import { MarkSearchUsers } from "./MarkSearchUsers";
import { Mark } from "./Mark";

export const MarkUsers = () => {
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const [choosenUser, setChoosenUser] = useState<string | null>(null);
  const { x, y } = useMousePosition({ ref });

  const handleChoosenUser = (name: string) => {
    setChoosenUser(name);
    setQuery("");
  };

  const handleQuery = (val: string) => {
    setQuery(val);
  };

  console.log(choosenUser);

  return (
    <div
      className="relative top-0 left-0 w-full h-full bg-black/70"
      onClick={(e) => e.stopPropagation()}
      ref={ref}
    >
      {x && y && !choosenUser && (
        <MarkSearchUsers
          query={query}
          handleQuery={handleQuery}
          handleChoosenUser={handleChoosenUser}
        />
      )}

      {choosenUser && <Mark name={choosenUser} x={x} y={y} />}
    </div>
  );
};
