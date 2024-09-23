import { useTranslation } from "react-i18next";
import { useUpdateUserData } from "./mutations/useUpdateUserData";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../../../ui/Textarea";

type EditBiogramProps = {
  biogram: string;
  user_name: string;
};

const MAX_LENGTH = 100;

export const EditBiogram = ({ biogram, user_name }: EditBiogramProps) => {
  const { t } = useTranslation();
  const { update } = useUpdateUserData(user_name);
  const [defaultBiogram, setDefaultBiogram] = useState(biogram);

  const handleChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    const text = ev.target.value;

    setDefaultBiogram(text.slice(0, MAX_LENGTH));
  };

  const changeDescription = (biogram: string) => {
    setDefaultBiogram((prevBiogram) => prevBiogram + biogram);
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">{t("profile.biogram")}</h2>
      <Textarea
        changeDescription={changeDescription}
        description={defaultBiogram}
        handleChange={handleChange}
        type="storie"
        onBlur={() => update({ biogram: defaultBiogram })}
      />
    </>
  );
};
