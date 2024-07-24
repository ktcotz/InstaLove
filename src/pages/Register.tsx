import { RegisterForm } from "../features/authentication/RegisterForm";
import { HomeNavigation } from "../layout/HomeNavigation";
import { GlobalRoutes } from "../typing/routes";
import { Container } from "../ui/Container";
import { CustomLink } from "../ui/CustomLink";
import { Logo } from "../ui/Logo";
import { Wrapper } from "../ui/Wrapper";

export const Register = () => {
  return (
    <div className="min-h-screen bg-stone-100 pb-20">
      <HomeNavigation />
      <main className="flex items-center justify-center">
        <Wrapper modifier="form">
          <div className="animate-fade-bottom">
            <Container>
              <div className="mb-12">
                <Logo />
              </div>
              <RegisterForm />
            </Container>
            <div className="p-4 border border-stone-300 text-center mt-4">
              <p className="text-stone-600 font-semibold">
                Masz konto?{" "}
                <CustomLink to={GlobalRoutes.Home} modifier="link">
                  Zaloguj się
                </CustomLink>
              </p>
            </div>
          </div>
        </Wrapper>
      </main>
    </div>
  );
};
