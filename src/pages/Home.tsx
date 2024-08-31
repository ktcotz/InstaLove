import { useTranslation } from "react-i18next";
import { LoginForm } from "../features/authentication/LoginForm";
import { HomeNavigation } from "../layout/HomeNavigation";
import { GlobalRoutes } from "../typing/routes";
import { AnimatedImages } from "../ui/AnimatedImages";
import { Container } from "../ui/Container";
import { CustomLink } from "../ui/CustomLink";
import { Logo } from "../ui/Logo";
import { Wrapper } from "../ui/Wrapper";
import { useMediaQuery } from "usehooks-ts";

const TABLET_VIEWPORT = "1024px";

export const Home = () => {
  const { t } = useTranslation();
  const isTablet = useMediaQuery(`(max-width:${TABLET_VIEWPORT})`);

  return (
    <div className="min-h-screen bg-stone-100">
      <HomeNavigation />

      <main className="flex items-center justify-center">
        <Wrapper modifier="home">
          <div className="grid place-items-center lg:grid-cols-2 lg:gap-8">
            {!isTablet && <AnimatedImages />}
            <div className="animate-fade-bottom lg:animate-fade-right w-full lg:w-4/5">
              <Container>
                <div className="mb-12">
                  <Logo />
                </div>
                <LoginForm />
              </Container>
              <div className="p-4 border border-stone-300 text-center mt-4">
                <p className="text-stone-600 font-semibold">
                  {t("home.no-account")}{" "}
                  <CustomLink to={GlobalRoutes.Register} modifier="link">
                    {t("links.register")}
                  </CustomLink>
                </p>
              </div>
            </div>
          </div>
        </Wrapper>
      </main>
    </div>
  );
};
