import { useMediaQuery } from "usehooks-ts";
import { GlobalRoutes } from "../typing/routes";
import { CustomLink, CustomLinkModifier } from "./CustomLink";
import { FaInstagram } from "react-icons/fa";

type LogoProps = {
  modifier?: CustomLinkModifier;
};

export const Logo = ({ modifier }: LogoProps) => {
  const matches = useMediaQuery("(max-width:1024px)");

  return (
    <h1
      className={`font-hand ${
        modifier ? "text-xl lg:text-2xl" : "text-4xl lg:text-7xl"
      }  text-stone-900`}
    >
      <CustomLink modifier={modifier || "logo"} to={GlobalRoutes.Home}>
        {matches && modifier === "small-logo" ? <FaInstagram /> : "InstaLove"}
      </CustomLink>
    </h1>
  );
};
