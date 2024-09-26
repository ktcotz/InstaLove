import { useUser } from "../../authentication/queries/useUser";
import { LanguageSwitcher } from "../../../ui/LanguageSwitcher";
import { ThemeSwitcher } from "../../../ui/ThemeSwitcher";
import { EditUsername } from "./EditUsername";
import { EditBiogram } from "./EditBiogram";
import { EditProfileType } from "./EditProfileType";
import { useProfile } from "../queries/useProfile";
import { Loader } from "../../../ui/Loader";
import { Avatar } from "../avatar/Avatar";
import { useTranslation } from "react-i18next";

export const EditProfile = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { data: current, isLoading } = useProfile(
    user?.user_metadata.user_name
  );

  if (isLoading) return <Loader />;

  if (!current) return;

  return (
    <div className="pb-32">
      <h1 className="text-xl text-stone-950 font-semibold mb-6 dark:text-stone-50">
        {t("profile.edit")}
      </h1>
      <div className="bg-stone-200 dark:bg-stone-950 border border-stone-300 rounded-lg p-4 max-w-xl flex flex-col sm:flex-row items-center gap-6 mb-6">
        <div className="flex items-center gap-4">
          <Avatar size={64} />
          <div className="flex flex-col gap-1">
            <h2 className="font-semibold dark:text-stone-50">
              {current?.user_name}
            </h2>
            <p className="text-sm text-stone-700 dark:text-stone-300">
              {current.fullName}
            </p>
          </div>
        </div>
      </div>
      <div className="mb-6 max-w-fit">
        <EditProfileType type={current.type} user_name={current.user_name} />
      </div>
      <div className="mb-6 max-w-xl">
        <EditBiogram biogram={current.biogram} user_name={current.user_name} />
      </div>
      <div className="mb-12 max-w-xl">
        <EditUsername
          fullName={current.fullName}
          user_name={current.user_name}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-6 dark:text-stone-50">
          {t("profile.settings")}
        </h2>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div>
            <h3 className="text-xl mb-2 dark:text-stone-50">
              {t("profile.changei18n")}
            </h3>
            <LanguageSwitcher />
          </div>
          <div>
            <h3 className="text-xl mb-2 dark:text-stone-50">
              {t("profile.changeTheme")}
            </h3>
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};
