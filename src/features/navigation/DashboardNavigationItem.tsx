import { useTranslation } from "react-i18next";
import { CustomLink } from "../../ui/CustomLink";
import { dashboardNavigationData } from "./data";
import { FaHome, FaSearch, FaHeart, FaUser } from "react-icons/fa";
import { BiSolidMoviePlay, BiSolidMessageSquareDetail } from "react-icons/bi";
import { MdAddBox } from "react-icons/md";
import { MdExplore } from "react-icons/md";
import { GlobalRoutes } from "../../typing/routes";
import { resources } from "../../lib/i18n/i18n";
import { Button } from "../../ui/Button";
import { useNavigationContext } from "./context/useNavigationContext";
import { NavigationComponent } from "./context/NavigationContext";
import { useMediaQuery } from "usehooks-ts";

export type NavigationRoutes =
  keyof (typeof resources)["pl"]["translation"]["navigation"];

type DashboardNavigationItemProps = {
  icon: NavigationRoutes;
  title: (typeof dashboardNavigationData)[number]["title"];
  to?: GlobalRoutes;
  openComponent?: NavigationComponent;
};

const icons: Record<NavigationRoutes, JSX.Element> = {
  home: <FaHome aria-label="Strona główna" />,
  search: <FaSearch aria-label="Wyszukiwanie" />,
  explore: <MdExplore aria-label="Explorowanie" />,
  stories: <BiSolidMoviePlay aria-label="Reels" />,
  messages: <BiSolidMessageSquareDetail aria-label="Wiadomości" />,
  notifications: <FaHeart aria-label="Powiadomienia" />,
  create: <MdAddBox aria-label="Stwórz post" />,
  profile: <FaUser aria-label="Profil" />,
};

export const DashboardNavigationItem = ({
  title,
  icon,
  to,
  openComponent,
}: DashboardNavigationItemProps) => {
  const matches = useMediaQuery("(min-width:1024px)");
  const { t } = useTranslation();
  const { toggleOpen, component } = useNavigationContext();
  return (
    <li>
      {openComponent && (
        <Button modifier="navigation" onClick={() => toggleOpen(openComponent)}>
          <span className="text-xl sm:text-2xl  group-hover:scale-105 transition-all">
            {icons[icon]}
          </span>
          {matches ? (
            <span
              className={component === openComponent ? "font-semibold" : ""}
            >
              {t(title)}
            </span>
          ) : null}
        </Button>
      )}
      {to && (
        <CustomLink modifier="navigation" to={to} type="active-link">
          <span className="text-xl sm:text-2xl group-hover:scale-105 transition-all">
            {icons[icon]}
          </span>
          {matches ? (
            <span
              className={component === openComponent ? "font-semibold" : ""}
            >
              {t(title)}
            </span>
          ) : null}
        </CustomLink>
      )}
    </li>
  );
};
