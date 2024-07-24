import { useTranslation } from "react-i18next";
import { useFormContext } from "./context/useFormContext";
import { BiHide, BiShow } from "react-icons/bi";

export const FormTogglePassword = () => {
  const { isPasswordShow, togglePassword } = useFormContext();
  const { t } = useTranslation();

  const label = isPasswordShow
    ? t("form.hide-password-label")
    : t("form.show-password-label");

  return (
    <button aria-label={label} type="button" onClick={() => togglePassword()}>
      {isPasswordShow ? (
        <BiHide
          className="text-2xl"
          aria-label={t("form.show-password-label")}
        />
      ) : (
        <BiShow
          className="text-2xl"
          aria-label={t("form.hide-password-label")}
        />
      )}
    </button>
  );
};
