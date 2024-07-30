type EditBiogramProps = {
  biogram: string;
};

export const EditBiogram = ({ biogram }: EditBiogramProps) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Zmień biogram</h2>
      <label htmlFor="description" className="sr-only">
        Zmień biogram
      </label>
      <textarea
        placeholder="Biogram"
        className="w-full overflow-scroll px-2 pt-2 pb-8 resize-none border-stone-300 border"
        id="description"
        defaultValue={biogram}
      ></textarea>
    </>
  );
};
