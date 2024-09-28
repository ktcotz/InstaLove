import { ChangeEvent, useState } from "react";
import { Music } from "./Music";
import { Button } from "../../ui";
import { BiPlus } from "react-icons/bi";

type AddMusicProps = {
  handleAddMusic: (music: string) => void;
};

export const AddMusic = ({ handleAddMusic }: AddMusicProps) => {
  const [music, setMusic] = useState("https://www.youtube.com/watch");
  const [isValid, setIsValid] = useState(false);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const musicUrl = ev.target.value;

    setMusic(musicUrl);
  };

  const reset = () => {
    setMusic("");
    setIsValid(false);
  };

  const setNewMusic = (music: string) => {
    setMusic(music);
    setIsValid(false);
  };

  const handleClick = () => {
    setIsValid(music.startsWith("https://www.youtube.com/watch?v="));
  };

  return !isValid ? (
    <div className="flex flex-col gap-2 bg-stone-100 dark:bg-stone-950 rounded-xl p-4">
      <div className="flex flex-col gap-1">
        <label htmlFor="music" className="dark:text-stone-200 mb-2">
          Link youtube
        </label>
        <div className="relative w-full">
          <input
            type="text"
            name="music"
            id="music"
            onChange={handleChange}
            value={music}
            placeholder="https://www.youtube.com/watch?v=pw4nxAnaOuE"
            className="p-4 pr-8 text-xs border w-full rounded-md text-stone-800 dark:bg-stone-950 dark:text-stone-50 "
          />

          <Button modifier="music" onClick={handleClick}>
            <BiPlus />
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <Music
      url={music}
      reset={reset}
      handleAddMusic={handleAddMusic}
      newMusic={setNewMusic}
    />
  );
};
