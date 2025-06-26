import { useTranslation } from "react-i18next";
import { HiLockClosed } from "react-icons/hi";

export const PrivateProfile = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center flex-col gap-4 text-center">
      <div className="aspect-square bg-gradient-to-r from-pink-400 to-blue-400 w-16 h-16 rounded-full flex items-center justify-center">
        <div className="bg-white p-3 rounded-full">
          <HiLockClosed
            aria-label={t("profile.private")}
            className="text-3xl "
          />
        </div>
      </div>
      <h2 className="font-semibold text-xs">{t("profile.privateTitle")}</h2>
      <p className="text-stone-600 text-xs">
        {t("profile.privateDescription")}
      </p>
    </div>
  );
};
