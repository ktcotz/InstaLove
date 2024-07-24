import { Home } from "./pages/Home";
import { GlobalRoutes } from "./typing/routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FormContextProvider } from "./ui/form/context/FormContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";

const router = createBrowserRouter([
  {
    path: GlobalRoutes.Home,
    element: (
      <FormContextProvider>
        <Home />
      </FormContextProvider>
    ),
  },
  {
    path: GlobalRoutes.Login,
    element: (
      <FormContextProvider>
        <Login />
      </FormContextProvider>
    ),
  },
  {
    path: GlobalRoutes.Register,
    element: (
      <FormContextProvider>
        <Register />
      </FormContextProvider>
    ),
  },
  {
    path: GlobalRoutes.Dashboard,
    element: <Dashboard />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
