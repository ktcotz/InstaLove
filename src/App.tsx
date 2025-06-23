import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FormContextProvider } from "./ui/form/context/FormContext";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./ui/ProtectedRoute";
import { GlobalRoutes } from "./typing/routes";
import { FullPageLoader } from "./ui/FullPageLoader";

const Home = React.lazy(() =>
  import("./pages/Home").then((m) => ({ default: m.Home }))
);
const Login = React.lazy(() =>
  import("./pages/Login").then((m) => ({ default: m.Login }))
);
const Register = React.lazy(() =>
  import("./pages/Register").then((m) => ({ default: m.Register }))
);
const Dashboard = React.lazy(() =>
  import("./pages/Dashboard").then((m) => ({ default: m.Dashboard }))
);
const ForgotPassword = React.lazy(() =>
  import("./pages/ForgoPassword").then((m) => ({ default: m.ForgotPassword }))
);
const ResetPassword = React.lazy(() =>
  import("./pages/ResetPassword").then((m) => ({ default: m.ResetPassword }))
);
const DashboardExplore = React.lazy(() =>
  import("./pages/Dashboard/DashboardExplore").then((m) => ({
    default: m.DashboardExplore,
  }))
);
const DashboardMessages = React.lazy(() =>
  import("./pages/Dashboard/DashboardMessages").then((m) => ({
    default: m.DashboardMessages,
  }))
);
const DashboardProfile = React.lazy(() =>
  import("./pages/Dashboard/DashboardProfile").then((m) => ({
    default: m.DashboardProfile,
  }))
);
const DashboardReels = React.lazy(() =>
  import("./pages/Dashboard/DashboardReels").then((m) => ({
    default: m.DashboardReels,
  }))
);
const DashboardHome = React.lazy(() =>
  import("./pages/Dashboard/DashboardHome").then((m) => ({
    default: m.DashboardHome,
  }))
);
const DashboardProfileEdit = React.lazy(() =>
  import("./pages/Dashboard/DashboardProfileEdit").then((m) => ({
    default: m.DashboardProfileEdit,
  }))
);
const Posts = React.lazy(() =>
  import("./pages/Dashboard/Profile/Posts").then((m) => ({ default: m.Posts }))
);
const Reels = React.lazy(() =>
  import("./pages/Dashboard/Profile/Reels").then((m) => ({ default: m.Reels }))
);
const Bookmarks = React.lazy(() =>
  import("./pages/Dashboard/Profile/Bookmarks").then((m) => ({
    default: m.Bookmarks,
  }))
);
const DashboardIndividualPost = React.lazy(() =>
  import("./pages/Dashboard/DashboardIndividualPost").then((m) => ({
    default: m.DashboardIndividualPost,
  }))
);
const DashboardNotifications = React.lazy(() =>
  import("./pages/Dashboard/DashboardNotifications").then((m) => ({
    default: m.DashboardNotifications,
  }))
);
const NotFound = React.lazy(() =>
  import("./pages/NotFound").then((m) => ({ default: m.NotFound }))
);
const StartChat = React.lazy(() =>
  import("./features/chat/StartChat").then((m) => ({ default: m.StartChat }))
);
const ChatDashboard = React.lazy(() =>
  import("./features/chat/ChatDashboard").then((m) => ({
    default: m.ChatDashboard,
  }))
);

const loader = <FullPageLoader />;

export const router = createBrowserRouter([
  {
    path: GlobalRoutes.Home,
    element: (
      <Suspense fallback={loader}>
        <FormContextProvider>
          <Home />
        </FormContextProvider>
      </Suspense>
    ),
  },
  {
    path: GlobalRoutes.Login,
    element: (
      <Suspense fallback={loader}>
        <FormContextProvider>
          <Login />
        </FormContextProvider>
      </Suspense>
    ),
  },
  {
    path: GlobalRoutes.ForgotPassword,
    element: (
      <Suspense fallback={loader}>
        <FormContextProvider>
          <ForgotPassword />
        </FormContextProvider>
      </Suspense>
    ),
  },
  {
    path: GlobalRoutes.ResetPassword,
    element: (
      <Suspense fallback={loader}>
        <FormContextProvider>
          <ResetPassword />
        </FormContextProvider>
      </Suspense>
    ),
  },
  {
    path: GlobalRoutes.Register,
    element: (
      <Suspense fallback={loader}>
        <FormContextProvider>
          <Register />
        </FormContextProvider>
      </Suspense>
    ),
  },
  {
    path: GlobalRoutes.Dashboard,
    element: (
      <Suspense fallback={loader}>
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      </Suspense>
    ),
    children: [
      {
        path: GlobalRoutes.DashboardHome,
        element: (
          <Suspense fallback={loader}>
            <DashboardHome />
          </Suspense>
        ),
      },
      {
        path: GlobalRoutes.DashboardExplore,
        element: (
          <Suspense fallback={loader}>
            <DashboardExplore />
          </Suspense>
        ),
      },
      {
        path: GlobalRoutes.DashboardMessages,
        element: (
          <Suspense fallback={loader}>
            <DashboardMessages />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={loader}>
                <StartChat />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={loader}>
                <ChatDashboard />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: GlobalRoutes.DashboardNotifications,
        element: (
          <Suspense fallback={loader}>
            <DashboardNotifications />
          </Suspense>
        ),
      },
      {
        path: GlobalRoutes.DashboardProfile,
        element: (
          <Suspense fallback={loader}>
            <DashboardProfile />
          </Suspense>
        ),
        children: [
          {
            path: "",
            element: (
              <Suspense fallback={loader}>
                <Posts />
              </Suspense>
            ),
          },
          {
            path: GlobalRoutes.ProfilePosts,
            element: (
              <Suspense fallback={loader}>
                <Posts />
              </Suspense>
            ),
          },
          {
            path: GlobalRoutes.ProfileReels,
            element: (
              <Suspense fallback={loader}>
                <Reels />
              </Suspense>
            ),
          },
          {
            path: GlobalRoutes.ProfileBookmarks,
            element: (
              <Suspense fallback={loader}>
                <Bookmarks />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: GlobalRoutes.DashboardIndividualPost,
        element: (
          <Suspense fallback={loader}>
            <DashboardIndividualPost />
          </Suspense>
        ),
      },
      {
        path: GlobalRoutes.DashboardProfileEdit,
        element: (
          <Suspense fallback={loader}>
            <DashboardProfileEdit />
          </Suspense>
        ),
      },
      {
        path: GlobalRoutes.DashboardReels,
        element: (
          <Suspense fallback={loader}>
            <DashboardReels />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: GlobalRoutes.NotFound,
    element: (
      <Suspense fallback={loader}>
        <NotFound />
      </Suspense>
    ),
  },
]);

export const App = () => (
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
        success: { duration: 3000 },
      }}
      gutter={8}
    />
  </>
);
