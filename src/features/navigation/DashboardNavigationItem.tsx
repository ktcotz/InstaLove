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
import { Tooltip } from "react-tooltip";
import { useUser } from "../authentication/queries/useUser";

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
  const mobileMatches = useMediaQuery("(max-width:768px)");
  const { t } = useTranslation();
  const { toggleOpen, component } = useNavigationContext();
  const { user } = useUser();

  return (
    <li>
      {openComponent && (
        <Button
          modifier="navigation"
          onClick={() => toggleOpen(openComponent)}
          data-tooltip-id={`button-${title}`}
          data-tooltip-place={mobileMatches ? "top" : "right"}
        >
          <span className="text-xl sm:text-2xl  group-hover:scale-105 transition-all">
            {icons[icon]}
          </span>
          {matches ? (
            <span
              className={component === openComponent ? "font-semibold" : ""}
            >
              {t(title)}
            </span>
          ) : (
            <Tooltip id={`button-${title}`}>{t(title)}</Tooltip>
          )}
        </Button>
      )}
      {to && (
        <CustomLink
          modifier="navigation"
          to={
            to === GlobalRoutes.DashboardProfile
              ? `${user?.user_metadata.user_name}`
              : to
          }
          type="active-link"
          data-tooltip-id={`link-${title}`}
          data-tooltip-place={mobileMatches ? "top" : "right"}
        >
          {to === GlobalRoutes.DashboardProfile && user ? (
            <img
              src={`${user.user_metadata?.avatar_url}`}
              width={24}
              height={24}
              alt={`${user.user_metadata?.user_name}`}
              className="rounded-full"
            />
          ) : (
            <span className="text-xl sm:text-2xl group-hover:scale-105 transition-all">
              {icons[icon]}
            </span>
          )}

          {matches ? (
            <span
              className={component === openComponent ? "font-semibold" : ""}
            >
              {t(title)}
            </span>
          ) : (
            <Tooltip id={`link-${title}`}>{t(title)}</Tooltip>
          )}
        </CustomLink>
      )}
    </li>
  );
};
