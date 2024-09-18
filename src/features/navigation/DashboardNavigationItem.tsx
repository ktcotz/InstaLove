import { CustomLink, Button, Modal } from "./../../ui";
import {
  MdOutlineExplore,
  MdExplore,
  MdMovieCreation,
  MdOutlineMovieCreation,
  MdMessage,
  MdOutlineMessage,
  MdOutlineAddBox,
} from "react-icons/md";

import { FaRegHeart, FaRegUser } from "react-icons/fa";

import { useTranslation } from "react-i18next";
import { dashboardNavigationData } from "./data";
import { GoHome, GoHomeFill, GoSearch } from "react-icons/go";
import { GlobalRoutes } from "../../typing/routes";
import { useNavigationContext } from "./context/useNavigationContext";
import { NavigationComponent } from "./context/NavigationContext";
import { useMediaQuery } from "usehooks-ts";
import { Tooltip } from "react-tooltip";
import { useUser } from "../authentication/queries/useUser";
import { useProfile } from "../profile/queries/useProfile";
import { NotificationsCounter } from "../notifications/NotificationsCounter";
import { NavigationRoutes } from "./types";
import { useLocation } from "react-router";
import { CreatePost } from "../create/CreatePost";

type DashboardNavigationItemProps = {
  icon: NavigationRoutes;
  title: (typeof dashboardNavigationData)[number]["title"];
  to?: GlobalRoutes;
  openComponent?: NavigationComponent;
};

const MOBILE_VIEWPORT = "768px";
const TABLET_VIEWPORT = "1024px";

export const DashboardNavigationItem = ({
  title,
  icon,
  to,
  openComponent,
}: DashboardNavigationItemProps) => {
  const location = useLocation();

  const mobileMatches = useMediaQuery(`(max-width:${MOBILE_VIEWPORT})`);
  const matches = useMediaQuery(`(max-width:${TABLET_VIEWPORT})`);
  const { t } = useTranslation();
  const { toggleOpen, component } = useNavigationContext();
  const { user } = useUser();
  const { data: currentUser } = useProfile(user!.user_metadata.user_name);

  if (!currentUser) return;

  const icons: Record<NavigationRoutes, JSX.Element> = {
    home:
      location.pathname === GlobalRoutes.Dashboard ? (
        <GoHomeFill aria-label={t("navigation.home")} />
      ) : (
        <GoHome aria-label={t("navigation.home")} />
      ),
    search: <GoSearch aria-label={t("navigation.search")} />,
    explore:
      location.pathname === GlobalRoutes.DashboardExplore ? (
        <MdExplore aria-label={t("navigation.explore")} />
      ) : (
        <MdOutlineExplore aria-label={t("navigation.explore")} />
      ),
    stories:
      location.pathname === GlobalRoutes.DashboardReels ? (
        <MdMovieCreation aria-label={t("navigation.stories")} />
      ) : (
        <MdOutlineMovieCreation aria-label={t("navigation.stories")} />
      ),
    messages:
      location.pathname === GlobalRoutes.DashboardMessages ? (
        <MdMessage aria-label={t("navigation.messages")} />
      ) : (
        <MdOutlineMessage aria-label={t("navigation.messages")} />
      ),
    notifications: <FaRegHeart aria-label={t("navigation.notifications")} />,
    create: <MdOutlineAddBox aria-label={t("navigation.create")} />,
    profile: <FaRegUser aria-label={t("navigation.profile")} />,
  };

  if (to) {
    return (
      <CustomLink
        modifier="navigation"
        to={
          to === GlobalRoutes.DashboardProfile
            ? `${currentUser!.user_name}`
            : to
        }
        activeClass="bg-stone-200 font-semibold"
        type="active-link"
        data-tooltip-id={`link-${title}`}
        data-tooltip-place={mobileMatches ? "top" : "right"}
      >
        {to === GlobalRoutes.DashboardProfile && user ? (
          <img
            src={`${currentUser.avatar_url}`}
            width={24}
            height={24}
            alt={`${currentUser.user_name}`}
            className="rounded-full w-6 h-6"
          />
        ) : (
          <span className="text-xl sm:text-2xl group-hover:scale-105 transition-all">
            {icons[icon]}
          </span>
        )}

        {!matches ? (
          <span className={component === openComponent ? "font-semibold" : ""}>
            {t(title)}
          </span>
        ) : (
          <Tooltip id={`link-${title}`}>{t(title)}</Tooltip>
        )}
      </CustomLink>
    );
  }

  return (
    <li>
      {openComponent && (
        <Modal>
          {title === "navigation.create" && (
            <>
              <Modal.Content>
                <CreatePost type="normal" />
              </Modal.Content>
              <Modal.Open>
                <Button
                  modifier="navigation"
                  onClick={() => toggleOpen(openComponent)}
                  data-tooltip-id={`button-${title}`}
                  data-tooltip-place={mobileMatches ? "top" : "right"}
                >
                  <span className="text-xl sm:text-2xl  group-hover:scale-105 transition-all">
                    {icons[icon]}
                  </span>
                  {!matches ? (
                    <span
                      className={
                        component === openComponent ? "font-semibold" : ""
                      }
                    >
                      {t(title)}
                    </span>
                  ) : (
                    <Tooltip id={`button-${title}`}>{t(title)}</Tooltip>
                  )}
                </Button>
              </Modal.Open>
            </>
          )}
          {title !== "navigation.create" && (
            <Button
              modifier="navigation"
              onClick={() => toggleOpen(openComponent)}
              data-tooltip-id={`button-${title}`}
              data-tooltip-place={mobileMatches ? "top" : "right"}
            >
              <span className="relative text-xl sm:text-2xl  group-hover:scale-105 transition-all">
                {icons[icon]}
                {title === "navigation.notifications" && (
                  <NotificationsCounter />
                )}
              </span>
              {!matches ? (
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
        </Modal>
      )}
    </li>
  );
};
