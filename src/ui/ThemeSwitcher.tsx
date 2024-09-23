import { ChangeEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaAffiliatetheme } from "react-icons/fa";
import { useTernaryDarkMode } from "usehooks-ts";

export const ThemeSwitcher = () => {
  const { t } = useTranslation();
  const { isDarkMode, ternaryDarkMode, setTernaryDarkMode } =
    useTernaryDarkMode();

  const handleChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const theme = ev.target.value;

    if (theme === "light" || theme === "dark") {
      setTernaryDarkMode(theme);
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="relative rounded-sm border bg-stone-200 text-stone-950">
      <FaAffiliatetheme
        className="absolute left-2 top-1/2 -translate-y-1/2 text-xl"
        aria-label={t("profile.changeTheme")}
      />

      <label htmlFor="language" className="sr-only">
        {t("profile.changeTheme")}
      </label>
      <select
        name="language"
        id="language"
        value={ternaryDarkMode}
        onChange={handleChange}
        className="rounded-sm bg-transparent w-full px-10 py-4 text-lg transition focus:outline-none focus:ring focus:ring-stone-500 focus:ring-offset-2"
      >
        <option value="light" className="text-slate-900">
          {t("profile.white")}
        </option>
        <option value="dark" className="text-slate-900">
          {t("profile.black")}
        </option>
      </select>
    </div>
  );
};
