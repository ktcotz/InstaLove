import { Home } from "./pages/Home";
import { GlobalRoutes } from "./typing/routes";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: GlobalRoutes.Home,
    element: <Home />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
