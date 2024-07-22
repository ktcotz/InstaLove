import { Home } from "./pages/Home";
import { GlobalRoutes } from "./typing/routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FormContextProvider } from "./ui/form/context/FormContext";

const router = createBrowserRouter([
  {
    path: GlobalRoutes.Home,
    element: (
      <FormContextProvider>
        <Home />
      </FormContextProvider>
    ),
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
