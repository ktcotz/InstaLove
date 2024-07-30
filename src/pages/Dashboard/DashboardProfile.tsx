import { ProfileDetails } from "../../features/profile/ProfileDetails";

export const DashboardProfile = () => {
  return (
    <>
      <div className="flex flex-col gap-8">
        <ProfileDetails />
      </div>
    </>
  );
};
