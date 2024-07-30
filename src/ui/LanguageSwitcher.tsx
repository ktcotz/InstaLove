import { useTranslation } from "react-i18next";
import { MdOutlineTranslate } from "react-icons/md";

export const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="relative rounded-sm border bg-stone-200 text-stone-950">
      <MdOutlineTranslate
        className="absolute left-2 top-1/2 -translate-y-1/2 text-xl"
        aria-label="Zmień język"
      />

      <label htmlFor="language" className="sr-only">
        Zmień język
      </label>
      <select
        name="language"
        id="language"
        className="rounded-sm bg-transparent px-10 py-4 text-lg transition focus:outline-none focus:ring focus:ring-slate-50"
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="pl" className="text-slate-900">
          Polski
        </option>
        <option value="en" className="text-slate-900">
          English
        </option>
      </select>
    </div>
  );
};
