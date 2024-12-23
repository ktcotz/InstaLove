import { ForgotPasswordForm } from "../features/authentication/ForgotPasswordForm";
import { HomeNavigation } from "../layout/HomeNavigation";
import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";
import { Wrapper } from "../ui/Wrapper";

export const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-stone-100 pb-20 dark:bg-stone-950">
      <HomeNavigation />
      <main className="flex items-center justify-center">
        <Wrapper modifier="form">
          <Container>
            <div className="mb-12">
              <Logo />
            </div>
            <ForgotPasswordForm />
          </Container>
        </Wrapper>
      </main>
    </div>
  );
};
