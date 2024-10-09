import { ReactNode, useEffect } from "react";
import { useUser } from "../features/authentication/queries/useUser";
import { useNavigate } from "react-router";
import { GlobalRoutes } from "../typing/routes";
import { useAuth } from "../features/authentication/context/useAuth";
import { Logo } from "./Logo";
import { useLoggedIn } from "../features/authentication/mutations/useLoggedIn";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useUser();
  const { setupUser } = useAuth();
  const navigate = useNavigate();
  const { logged } = useLoggedIn();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(GlobalRoutes.Login);
    }

    if (!isLoading && user) {
      logged({ user_id: user.id });
      setupUser(user);
    }
  }, [isLoading, isAuthenticated, navigate, setupUser, user, logged]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Logo />
      </div>
    );
  }

  return isAuthenticated && children;
};
