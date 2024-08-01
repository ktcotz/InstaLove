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
import { Modal } from "../../ui/modal/Modal";
import { CreatePost } from "../posts/CreatePost";
import { useProfile } from "../profile/queries/useProfile";

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
  const mobileMatches = useMediaQuery("(max-width:768px)");
  const matches = useMediaQuery("(min-width:1024px)");
  const { t } = useTranslation();
  const { toggleOpen, component } = useNavigationContext();
  const { user } = useUser();
  const { data: currentUser } = useProfile(user!.user_metadata.user_name);

  if (!currentUser) return;

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
            src={`${currentUser!.avatar_url}`}
            width={32}
            height={32}
            alt={`${currentUser!.user_name}`}
            className="rounded-full w-[32px] h-[32px]"
          />
        ) : (
          <span className="text-xl sm:text-2xl group-hover:scale-105 transition-all">
            {icons[icon]}
          </span>
        )}

        {matches ? (
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
                <CreatePost />
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
                  {matches ? (
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
        </Modal>
      )}
    </li>
  );
};
