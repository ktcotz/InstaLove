import { useUpdateUserData } from "./mutations/useUpdateUserData";
import { ChangeEvent, useState } from "react";

type EditBiogramProps = {
  biogram: string;
  user_name: string;
};

const MAX_LENGTH = 100;

export const EditBiogram = ({ biogram, user_name }: EditBiogramProps) => {
  const { update } = useUpdateUserData(user_name);
  const [defaultBiogram, setDefaultBiogram] = useState(biogram);

  const handleChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    const text = ev.target.value;

    setDefaultBiogram(text.slice(0, MAX_LENGTH));
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Zmień biogram</h2>
      <div className="relative">
        <label htmlFor="description" className="sr-only">
          Zmień biogram
        </label>
        <textarea
          placeholder="Biogram"
          className="w-full overflow-scroll px-2 pt-2 pb-8 resize-none border-stone-300 border"
          id="description"
          value={defaultBiogram}
          defaultValue={defaultBiogram}
          onChange={handleChange}
          onBlur={() => update({ biogram: defaultBiogram })}
        ></textarea>
        <p className="text-xs text-stone-600 absolute bottom-4 right-4">
          {defaultBiogram.length}/{MAX_LENGTH}
        </p>
      </div>
    </>
  );
};
