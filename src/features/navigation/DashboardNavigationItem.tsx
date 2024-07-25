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

export type NavigationRoutes =
  keyof (typeof resources)["pl"]["translation"]["navigation"];

type DashboardNavigationItemProps = {
  icon: NavigationRoutes;
  title: (typeof dashboardNavigationData)[number]["title"];
  to?: GlobalRoutes;
  openComponent?: NavigationComponent;
};

const icons: Record<NavigationRoutes, JSX.Element> = {
  home: <FaHome />,
  search: <FaSearch />,
  explore: <MdExplore />,
  stories: <BiSolidMoviePlay />,
  messages: <BiSolidMessageSquareDetail />,
  notifications: <FaHeart />,
  create: <MdAddBox />,
  profile: <FaUser />,
};

export const DashboardNavigationItem = ({
  title,
  icon,
  to,
  openComponent,
}: DashboardNavigationItemProps) => {
  const { t } = useTranslation();
  const { toggleOpen } = useNavigationContext();
  return (
    <li>
      {openComponent && (
        <Button modifier="navigation" onClick={() => toggleOpen(openComponent)}>
          <span className="text-2xl group-hover:scale-105 transition-all">
            {icons[icon]}
          </span>
          <span>{t(title)}</span>
        </Button>
      )}
      {to && (
        <CustomLink modifier="navigation" to={to} type="active-link">
          <span className="text-2xl group-hover:scale-105 transition-all">
            {icons[icon]}
          </span>
          <span>{t(title)}</span>
        </CustomLink>
      )}
    </li>
  );
};
