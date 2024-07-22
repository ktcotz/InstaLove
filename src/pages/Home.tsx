import { LoginForm } from "../features/authentication/LoginForm";
import { AnimatedImages } from "../ui/AnimatedImages";
import { Container } from "../ui/Container";
import { Logo } from "../ui/Logo";
import { Wrapper } from "../ui/Wrapper";
import { useMediaQuery } from "usehooks-ts";

export const Home = () => {
  const isTablet = useMediaQuery("(min-width:1024px)");

  return (
    <main className="min-h-screen bg-stone-100 flex items-center justify-center">
      <Wrapper>
        <div className="grid place-items-center lg:grid-cols-2 lg:gap-8">
          {isTablet && <AnimatedImages />}
          <Container>
            <div className="mb-12">
              <Logo />
            </div>
            <LoginForm />
          </Container>
        </div>
      </Wrapper>
    </main>
  );
};
