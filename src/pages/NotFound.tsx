import { useTranslation } from "react-i18next";
import { CustomLink } from "../ui";
import { GlobalRoutes } from "../typing/routes";

export const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex flex-col gap-8 items-center justify-center">
      <h1 className="text-2xl">{t("notFound.title")}</h1>
      <CustomLink to={GlobalRoutes.Home}>{t("notFound.back")}</CustomLink>
    </div>
  );
};
