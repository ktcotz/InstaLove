import * as loc from "date-fns/locale";

export const getDateFnsLocaleByActiveLanguage = (lang: string) =>
  lang === "en" ? loc["enUS"] : Object.values(loc).find((l) => l.code === lang);
