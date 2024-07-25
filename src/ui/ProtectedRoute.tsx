import { ReactNode, useEffect } from "react";
import { useUser } from "../features/authentication/queries/useUser";
import { Loader } from "./Loader";
import { useNavigate } from "react-router";
import { GlobalRoutes } from "../typing/routes";

type ProtectedRouteProps = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(GlobalRoutes.Login);
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return <Loader />;
  }

  return isAuthenticated && children;
};
