import { Home } from "./pages/Home";
import { GlobalRoutes } from "./typing/routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FormContextProvider } from "./ui/form/context/FormContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { ForgotPassword } from "./pages/ForgoPassword";
import { Toaster } from "react-hot-toast";
import { ResetPassword } from "./pages/ResetPassword";

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
    path: GlobalRoutes.ForgotPassword,
    element: (
      <FormContextProvider>
        <ForgotPassword />
      </FormContextProvider>
    ),
  },
  {
    path: GlobalRoutes.ResetPassword,
    element: (
      <FormContextProvider>
        <ResetPassword />
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
  return (
    <>
      <RouterProvider router={router} />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            maxWidth: "30rem",
            textAlign: "center",
            backgroundColor: "#10141E",
            color: "rgb(248,250,252)",
          },
          success: {
            duration: 3000,
          },
        }}
        gutter={8}
      />
    </>
  );
};
