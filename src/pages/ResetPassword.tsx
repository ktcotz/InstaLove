import { ResetPasswordForm } from "../features/authentication/ResetPasswordForm";
import { HomeNavigation } from "../layout/HomeNavigation";
import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";
import { Wrapper } from "../ui/Wrapper";

export const ResetPassword = () => {
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
              <ResetPasswordForm />
            </Container>
          </div>
        </Wrapper>
      </main>
    </div>
  );
};
