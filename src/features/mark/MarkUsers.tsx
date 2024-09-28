import { useRef, useState } from "react";
import useMousePosition from "../../hooks/useMousePosition";
import { MarkSearchUsers } from "./MarkSearchUsers";
import { Mark } from "./Mark";
import { useMarksContext } from "./context/useMarksContext";
import { MarkDTO } from "./schema/MarkSchema";

export const MarkUsers = () => {
  const { marks } = useMarksContext();
  const { addMark } = useMarksContext();
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useMousePosition({ ref });
  const [query, setQuery] = useState("");
  const [choosenUser, setChoosenUser] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleChoosenUser = (mark: MarkDTO) => {
    const newMark = {
      ...mark,
    };

    addMark(newMark);

    setChoosenUser(mark.name);
    setQuery("");
  };

  const handleQuery = (val: string) => {
    setQuery(val);
  };

  return (
    <div
      className="absolute top-0 left-0 w-full h-full bg-black/30"
      onClick={(e) => {
        e.stopPropagation();
        setChoosenUser("");

        if (e.target === ref.current) {
          const { width, height } = ref.current.getBoundingClientRect();

          setPosition({
            x: Math.ceil((x / width) * 100),
            y: Math.ceil((y / height) * 100),
          });
        }
      }}
      ref={ref}
    >
      {x && y && !choosenUser ? (
        <MarkSearchUsers
          query={query}
          handleQuery={handleQuery}
          handleChoosenUser={handleChoosenUser}
          reset={() => setChoosenUser("reset")}
          position={position}
        />
      ) : null}

      {marks.length > 0
        ? marks.map((mark) => <Mark {...mark} key={mark.id} />)
        : null}
    </div>
  );
};
