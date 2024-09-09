import { Form, Loader } from "../../ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { ZodI18NHandler } from "../../lib/i18n/i18n.types";

import { useResetPassword } from "./mutations/useResetPassword";
import { useNavigate } from "react-router";
import {
  UpdatePasswordFormSchema,
  UpdatePasswordSchema,
} from "./schema/UpdatePasswordSchema";
import { GlobalRoutes } from "../../typing/routes";
import { useFormContext } from "../../ui/form/context/useFormContext";

export const ResetPasswordForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(UpdatePasswordFormSchema),
  });
  const { resetPassword, isUpdating, updateError } = useResetPassword();
  const { t } = useTranslation();
  const { isPasswordShow } = useFormContext();
  const navigate = useNavigate();

  const submitHandler = ({ password }: UpdatePasswordSchema) => {
    resetPassword(
      { password },
      {
        onSuccess: () => {
          navigate(GlobalRoutes.Login);
          reset();
        },
      }
    );
  };

  return (
    <div className="w-full">
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Item>
          <Form.InputContainer>
            <Form.Input
              id="password"
              type={`${isPasswordShow ? "text" : "password"}`}
              aria-invalid={!!errors?.password?.message}
              required
              {...register("password")}
            />
            <Form.Label id="password">{t("form.password-label")}</Form.Label>
            <Form.Icons>
              <Form.TogglePassword />
            </Form.Icons>
          </Form.InputContainer>
          {errors?.password && (
            <Form.Error>
              {t(errors.password.message as ZodI18NHandler)}
            </Form.Error>
          )}
        </Form.Item>
        <Form.Submit>
          {isUpdating ? <Loader /> : t("form.reset-password")}
        </Form.Submit>
        {updateError && (
          <div className="text-center">
            <Form.Error>{t(updateError.generateError())}</Form.Error>
          </div>
        )}
      </Form>
    </div>
  );
};
