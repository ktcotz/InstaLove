import { ReactNode, useEffect } from "react";
import { useUser } from "../features/authentication/queries/useUser";
import { Loader } from "./Loader";
import { useNavigate } from "react-router";
import { GlobalRoutes } from "../typing/routes";
import { useAuth } from "../features/authentication/context/useAuth";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoading, isAuthenticated, user } = useUser();
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
    return <Loader />;
  }

  return isAuthenticated && children;
};
