import { useMediaQuery } from "usehooks-ts";
import { GlobalRoutes } from "../typing/routes";
import { CustomLink } from "./CustomLink";
import { FaInstagram } from "react-icons/fa";
import { useTranslation } from "react-i18next";

type LogoModifier = "small-logo" | "logo";

type LogoProps = {
  modifier?: LogoModifier;
};

const TABLET_VIEWPORT = "1024px";

export const Logo = ({ modifier = "logo" }: LogoProps) => {
  const { t } = useTranslation();
  const matches = useMediaQuery(`(max-width:${TABLET_VIEWPORT})`);

  return (
    <h1
      className={`font-hand ${
        modifier ? "text-xl lg:text-2xl" : "text-4xl lg:text-7xl"
      }  text-stone-900 dark:text-stone-50`}
    >
      <CustomLink modifier={modifier} to={GlobalRoutes.Home}>
        {matches && modifier === "small-logo" ? (
          <>
            <FaInstagram aria-label={t("utils.logo-label")} />
            <span className="sr-only">{t("utils.logo-label")}</span>
          </>
        ) : (
          "InstaLove"
        )}
      </CustomLink>
    </h1>
  );
};
