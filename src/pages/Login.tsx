import { useTranslation } from "react-i18next";
import { LoginForm } from "../features/authentication/LoginForm";
import { HomeNavigation } from "../layout/HomeNavigation";
import { GlobalRoutes } from "../typing/routes";
import { Container } from "../ui/Container";
import { CustomLink } from "../ui/CustomLink";
import { Logo } from "../ui/Logo";
import { Wrapper } from "../ui/Wrapper";

export const Login = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-stone-100 pb-20 dark:bg-stone-950">
      <HomeNavigation />
      <main className="flex items-center justify-center">
        <Wrapper modifier="form">
          <div className="animate-fade-bottom">
            <Container>
              <div className="mb-12">
                <Logo />
              </div>
              <LoginForm />
            </Container>
            <div className="p-4 border border-stone-300 text-center mt-4 dark:border-stone-50">
              <p className="text-stone-600 font-semibold dark:text-stone-50">
                {t("home.no-account")}{" "}
                <CustomLink to={GlobalRoutes.Register} modifier="link">
                  {t("links.register")}
                </CustomLink>
              </p>
            </div>
          </div>
        </Wrapper>
      </main>
    </div>
  );
};
