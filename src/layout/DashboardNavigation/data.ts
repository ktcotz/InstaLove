import { NavigationI18NHandler } from "../../lib/i18n/i18n.types";
import { GlobalRoutes } from "../../typing/routes";
import { NavigationRoutes } from "./DashboardNavigationItem";

type Data = {
  id: number;
  title: NavigationI18NHandler;
  icon: NavigationRoutes;
  to?: GlobalRoutes;
};

export const dashboardNavigationData: Data[] = [
  {
    id: 1,
    title: "navigation.home",
    icon: "home",
    to: GlobalRoutes.Dashboard,
  },
  {
    id: 2,
    title: "navigation.search",
    icon: "search",
    to: GlobalRoutes.ForgotPassword,
  },
  {
    id: 3,
    title: "navigation.explore",
    icon: "explore",
    to: GlobalRoutes.DashboardExplore,
  },
  {
    id: 4,
    title: "navigation.stories",
    icon: "stories",
    to: GlobalRoutes.DashboardReels,
  },
  {
    id: 5,
    title: "navigation.messages",
    icon: "messages",
    to: GlobalRoutes.DashboardMessages,
  },
  {
    id: 6,
    title: "navigation.notifications",
    icon: "notifications",
    to: GlobalRoutes.ResetPassword,
  },
  {
    id: 7,
    title: "navigation.create",
    icon: "create",
    to: GlobalRoutes.ForgotPassword,
  },
  {
    id: 8,
    title: "navigation.profile",
    icon: "profile",
    to: GlobalRoutes.DashboardProfile,
  },
] as const;
