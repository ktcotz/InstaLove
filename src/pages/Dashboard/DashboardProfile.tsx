import { ProfileDetails } from "../../features/profile/ProfileDetails";
import { Wrapper } from "../../ui/Wrapper";

export const DashboardProfile = () => {
  return (
    <>
      <Wrapper modifier="details">
        <div className="flex flex-col gap-8">
          <ProfileDetails />
        </div>
      </Wrapper>
    </>
  );
};
