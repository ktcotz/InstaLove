import { GlobalRoutes } from "../typing/routes";
import { CustomLink, CustomLinkModifier } from "./CustomLink";

type LogoProps = {
  modifier?: CustomLinkModifier;
};

export const Logo = ({ modifier }: LogoProps) => {
  return (
    <h1
      className={`font-hand ${
        modifier ? "text-xl lg:text-2xl" : "text-4xl lg:text-7xl"
      }  text-stone-900`}
    >
      <CustomLink modifier={modifier || "logo"} to={GlobalRoutes.Home}>
        InstaLove
      </CustomLink>
    </h1>
  );
};
