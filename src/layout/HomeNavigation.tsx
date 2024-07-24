import { useTranslation } from "react-i18next";
import { GlobalRoutes } from "../typing/routes";
import { CustomLink } from "../ui/CustomLink";
import { Logo } from "../ui/Logo";
import { Wrapper } from "../ui/Wrapper";

export const HomeNavigation = () => {
  const { t } = useTranslation();
  return (
    <header className="mb-20 animate-[fadeFromTop_1s]">
      <nav className="bg-stone-100 py-4 border-b border-stone-300">
        <Wrapper>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Logo modifier="small-logo" />
            <div className="flex items-center gap-6">
              <CustomLink to={GlobalRoutes.Login}>
                {t("links.login")}
              </CustomLink>
              <CustomLink to={GlobalRoutes.Register} modifier="text">
                {t("links.register")}
              </CustomLink>
            </div>
          </div>
        </Wrapper>
      </nav>
    </header>
  );
};
