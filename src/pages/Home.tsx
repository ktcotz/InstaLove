import { useTranslation } from "react-i18next";
import { LoginForm } from "../features/authentication/LoginForm";
import { HomeNavigation } from "../layout/HomeNavigation";
import { GlobalRoutes } from "../typing/routes";
import { AnimatedImages } from "../ui/AnimatedImages";
import { Container } from "../ui/Container";
import { CustomLink } from "../ui/CustomLink";
import { Wrapper } from "../ui/Wrapper";
import { useMediaQuery, useTernaryDarkMode } from "usehooks-ts";
import { useEffect } from "react";

const TABLET_VIEWPORT = "1024px";

export const Home = () => {
  const { t } = useTranslation();
  const isTablet = useMediaQuery(`(max-width:${TABLET_VIEWPORT})`);
  const { isDarkMode } = useTernaryDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <HomeNavigation />

      <main className="flex items-center justify-center">
        <Wrapper modifier="home">
          <div className="grid place-items-center lg:grid-cols-2 lg:gap-8">
            {!isTablet && <AnimatedImages />}
            <div className=" w-full lg:w-4/5">
              <Container>
                <LoginForm />
              </Container>
              <div className="p-4 border border-stone-300 text-center mt-4 dark:border-stone-50 ">
                <p className="text-stone-600 font-semibold dark:text-stone-50">
                  {t("home.no-account")}
                </p>
                <CustomLink to={GlobalRoutes.Register} modifier="link">
                  {t("links.register")}
                </CustomLink>
              </div>
            </div>
          </div>
        </Wrapper>
      </main>
    </div>
  );
};
