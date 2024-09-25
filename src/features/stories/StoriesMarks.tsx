import { Mark } from "../mark/Mark";
import { useGetAllMarksOnPost } from "../mark/queries/useGetAllMarksOnPost";
import { useState } from "react";
import { ShowMarks } from "../mark/ShowMarks";

type StoriesMarksProps = {
  user_id: string;
  post_id: number;
};

export const StoriesMarks = ({ user_id, post_id }: StoriesMarksProps) => {
  const { marks } = useGetAllMarksOnPost({ post_id, user_id });
  const [showMarks, setShowMarks] = useState(false);

  const length = marks?.length;

  const toggleMarks = () => {
    setShowMarks((prevMarksState) => !prevMarksState);
  };

  if (!length) return null;

  return (
    <>
      <ShowMarks length={length} toggleMarks={toggleMarks} />
      {showMarks && marks.map((mark) => <Mark {...mark} key={mark.id} />)}
    </>
  );
};
