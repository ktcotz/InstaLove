import { GlobalRoutes } from "../typing/routes";
import { CustomLink } from "../ui/CustomLink";
import { Logo } from "../ui/Logo";
import { Wrapper } from "../ui/Wrapper";

export const HomeNavigation = () => {
  return (
    <nav className="bg-stone-100 py-4 border-b border-stone-300">
      <Wrapper>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Logo modifier="small-logo" />
          <div className="flex items-center gap-6">
            <CustomLink to={GlobalRoutes.Home}>Zaloguj się</CustomLink>
            <CustomLink to={GlobalRoutes.Home} modifier="text">
              Zarejestruj się
            </CustomLink>
          </div>
        </div>
      </Wrapper>
    </nav>
  );
};
