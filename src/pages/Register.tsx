import { Container, CustomLink, Wrapper } from "./../ui";
import { HomeNavigation } from "../layout/HomeNavigation";
import { RegisterForm } from "../features/authentication/RegisterForm";
import { GlobalRoutes } from "../typing/routes";
import { useTranslation } from "react-i18next";

export const Register = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-stone-100">
      <HomeNavigation />
      <main className="flex items-center justify-center">
        <Wrapper modifier="form">
          <div className="animate-fade-bottom">
            <Container>
              <RegisterForm />
            </Container>
            <div className="p-4 border border-stone-300 text-center mt-4">
              <p className="text-stone-600 font-semibold">
                {t("home.have-account")}
              </p>
              <CustomLink to={GlobalRoutes.Login} modifier="link">
                {t("links.login")}
              </CustomLink>
            </div>
          </div>
        </Wrapper>
      </main>
    </div>
  );
};
