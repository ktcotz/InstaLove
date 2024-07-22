import { GlobalRoutes } from "../typing/routes";
import { CustomLink } from "./CustomLink";

export const Logo = () => {
  return (
    <CustomLink modifier="logo" to={GlobalRoutes.Home}>
      <span className="font-hand text-7xl text-stone-900">InstaLove</span>
    </CustomLink>
  );
};
