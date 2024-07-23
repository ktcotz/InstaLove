import { useFormContext } from "./context/useFormContext";
import { BiHide, BiShow } from "react-icons/bi";

export const FormTogglePassword = () => {
  const { isPasswordShow, togglePassword } = useFormContext();

  const label = isPasswordShow ? "Hide password" : "Show password";

  return (
    <button aria-label={label} type="button" onClick={() => togglePassword()}>
      {isPasswordShow ? (
        <BiHide className="text-2xl" aria-label="Show password" />
      ) : (
        <BiShow className="text-2xl" aria-label="Hide password" />
      )}
    </button>
  );
};
