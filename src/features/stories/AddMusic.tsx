import { ChangeEvent, useState } from "react";
import { Music } from "./Music";

type AddMusicProps = {
  handleAddMusic: (music: string) => void;
};

export const AddMusic = ({ handleAddMusic }: AddMusicProps) => {
  const [music, setMusic] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const musicUrl = ev.target.value;

    setMusic(musicUrl);

    if (musicUrl.startsWith("https://www.youtube.com/watch")) {
      return setIsValid(true);
    }
  };

  const reset = () => {
    setMusic("");
    setIsValid(false);
  };

  const setNewMusic = (music: string) => {
    setMusic(music);
    setIsValid(false);
  };

  return !isValid ? (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <label htmlFor="music" className="dark:text-stone-200">
          Link youtube
        </label>
        <input
          type="text"
          name="music"
          id="music"
          onChange={handleChange}
          value={music}
          placeholder="https://www.youtube.com/watch?v=pw4nxAnaOuE"
          className="p-4 text-xs border border-blue-600 rounded-md text-stone-800 dark:bg-stone-950 dark:text-stone-50 dark:border-blue-800"
        />
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
