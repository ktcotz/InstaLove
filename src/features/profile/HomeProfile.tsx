import { GlobalRoutes } from "../../typing/routes";
import { CustomLink } from "../../ui/CustomLink";
import { ProposedProfiles } from "./ProposedProfiles";
import { User } from "./User";

export const HomeProfile = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <User />
      <div className="flex items-center gap-2 justify-between self-stretch">
        <h2 className="text-stone-600 font-medium text-sm">
          Propozycje dla Ciebie
        </h2>
        <CustomLink to={GlobalRoutes.DashboardExplore} modifier="all-profiles">
          Zobacz wszystkich
        </CustomLink>
      </div>
      <ProposedProfiles />
    </div>
  );
};
