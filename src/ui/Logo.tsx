import { GlobalRoutes } from "../typing/routes";
import { CustomLink } from "./CustomLink";

export const Logo = () => {
  return (
    <h1 className="font-hand text-4xl lg:text-7xl text-stone-900">
      <CustomLink modifier="logo" to={GlobalRoutes.Home}>
        InstaLove
      </CustomLink>
    </h1>
  );
};
