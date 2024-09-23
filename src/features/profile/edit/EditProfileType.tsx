import { FaRegUser } from "react-icons/fa";
import { useUpdateUserData } from "./mutations/useUpdateUserData";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";

type EditProfileTypeProps = {
  type: "public" | "private";
  user_name: string;
};

export const EditProfileType = ({ type, user_name }: EditProfileTypeProps) => {
  const { update } = useUpdateUserData(user_name);
  const { t } = useTranslation();

  const handleChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const type = ev.target.value;

    if (type === "public" || type === "private") {
      update({ type });
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6 dark:text-stone-50">
        {t("profile.type")}
      </h2>
      <div className="relative rounded-sm border bg-stone-200 text-stone-950">
        <FaRegUser
          className="absolute left-2 top-1/2 -translate-y-1/2 text-xl"
          aria-label={t("profile.type")}
        />

        <label htmlFor="profile-type" className="sr-only">
          {t("profile.type")}
        </label>
        <select
          name="profile-type"
          id="profile-type"
          className="rounded-sm bg-transparent w-full px-10 py-4 text-lg transition focus:outline-none focus:ring focus:ring-stone-500 focus:ring-offset-2"
          defaultValue={type}
          onChange={handleChange}
        >
          <option value="public" className="text-slate-900">
            {t("profile.publicType")}
          </option>
          <option value="private" className="text-slate-900">
            {t("profile.privateType")}
          </option>
        </select>
      </div>
    </>
  );
};
