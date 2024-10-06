import { Home } from "./pages/Home";
import { GlobalRoutes } from "./typing/routes";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { FormContextProvider } from "./ui/form/context/FormContext";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { ForgotPassword } from "./pages/ForgoPassword";
import { Toaster } from "react-hot-toast";
import { ResetPassword } from "./pages/ResetPassword";
import { ProtectedRoute } from "./ui/ProtectedRoute";
import { DashboardExplore } from "./pages/Dashboard/DashboardExplore";
import { DashboardMessages } from "./pages/Dashboard/DashboardMessages";
import { DashboardProfile } from "./pages/Dashboard/DashboardProfile";
import { DashboardReels } from "./pages/Dashboard/DashboardReels";
import { DashboardHome } from "./pages/Dashboard/DashboardHome";
import { DashboardProfileEdit } from "./pages/Dashboard/DashboardProfileEdit";
import { Posts } from "./pages/Dashboard/Profile/Posts";
import { Reels } from "./pages/Dashboard/Profile/Reels";
import { Bookmarks } from "./pages/Dashboard/Profile/Bookmarks";
import { DashboardIndividualPost } from "./pages/Dashboard/DashboardIndividualPost";
import { DashboardNotifications } from "./pages/Dashboard/DashboardNotifications";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
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
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: GlobalRoutes.DashboardHome,
        element: <DashboardHome />,
      },
      {
        path: GlobalRoutes.DashboardExplore,
        element: <DashboardExplore />,
      },
      {
        path: GlobalRoutes.DashboardMessages,
        element: <DashboardMessages />,
      },
      {
        path: GlobalRoutes.DashboardNotifications,
        element: <DashboardNotifications />,
      },
      {
        path: GlobalRoutes.DashboardProfile,
        element: <DashboardProfile />,
        children: [
          {
            path: "",
            element: <Navigate to={GlobalRoutes.ProfilePosts} />,
          },
          {
            path: GlobalRoutes.ProfilePosts,
            element: <Posts />,
          },
          {
            path: GlobalRoutes.ProfileReels,
            element: <Reels />,
          },
          {
            path: GlobalRoutes.ProfileBookmarks,
            element: <Bookmarks />,
          },
        ],
      },
      {
        path: GlobalRoutes.DashboardIndividualPost,
        element: <DashboardIndividualPost />,
      },
      {
        path: GlobalRoutes.DashboardProfileEdit,
        element: <DashboardProfileEdit />,
      },
      {
        path: GlobalRoutes.DashboardReels,
        element: <DashboardReels />,
      },
    ],
  },
  {
    path: GlobalRoutes.NotFound,
    element: <NotFound />,
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
