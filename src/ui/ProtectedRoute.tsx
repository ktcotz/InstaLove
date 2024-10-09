import { ReactNode, useEffect } from "react";
import { useUser } from "../features/authentication/queries/useUser";
import { useNavigate } from "react-router";
import { GlobalRoutes } from "../typing/routes";
import { useAuth } from "../features/authentication/context/useAuth";
import { Logo } from "./Logo";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, user, isLoading } = useUser();
  const { setupUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(GlobalRoutes.Login);
    }

    if (!isLoading && user) {
      setupUser(user);
    }
  }, [isLoading, isAuthenticated, navigate, setupUser, user]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Logo />
      </div>
    );
  }

  return isAuthenticated && children;
};
