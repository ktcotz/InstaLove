import { resources } from "../../lib/i18n/i18n";
import { NavigationI18NHandler } from "../../lib/i18n/i18n.types";
import { GlobalRoutes } from "../../typing/routes";
import { NavigationComponent } from "./context/NavigationContext";

export type NavigationData = {
  id: number;
  title: NavigationI18NHandler;
  icon: NavigationRoutes;
  to?: GlobalRoutes;
  openComponent?: NavigationComponent;
};

export type NavigationRoutes =
  keyof (typeof resources)["pl"]["translation"]["navigation"];
