import { useTranslation } from "react-i18next";
import { MdOutlineTranslate } from "react-icons/md";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="relative rounded-sm border bg-stone-200 text-stone-950">
      <MdOutlineTranslate
        className="absolute left-2 top-1/2 -translate-y-1/2 text-xl"
        aria-label={t("profile.changei18n")}
      />

      <label htmlFor="language" className="sr-only">
        {t("profile.changei18n")}
      </label>
      <select
        name="language"
        id="language"
        value={i18n.language}
        className="rounded-sm bg-transparent w-full px-10 py-4 text-lg transition focus:outline-none focus:ring focus:ring-stone-500 focus:ring-offset-2"
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="pl" className="text-slate-900">
          {t("profile.polish")}
        </option>
        <option value="en" className="text-slate-900">
          {t("profile.english")}
        </option>
      </select>
    </div>
  );
};
