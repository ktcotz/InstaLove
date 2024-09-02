import { Loader, Form } from "./../../ui";
import { useFormContext } from "../../ui/form/context/useFormContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormSchema,
  RegisterSchema,
} from "./schema/RegisterFormSchema";
import { useTranslation } from "react-i18next";
import { ZodI18NHandler } from "../../lib/i18n/i18n.types";
import { useRegister } from "./mutations/useRegister";

export const RegisterForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const { signup, isRegistering, signupError } = useRegister();

  const { t } = useTranslation();
  const { isPasswordShow } = useFormContext();

  const submitHandler = ({ email, password, nickname }: RegisterSchema) => {
    signup({ email, password, nickname });
  };

  return (
    <div className="w-full">
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Item>
          <Form.InputContainer>
            <Form.Input
              id="email"
              required
              type="text"
              isError={errors?.email?.message}
              aria-invalid={!!errors?.email?.message}
              {...register("email")}
            />
            <Form.Label id="email">{t("form.email-label")}</Form.Label>
          </Form.InputContainer>
          {errors?.email && (
            <Form.Error>{t(errors.email.message as ZodI18NHandler)}</Form.Error>
          )}
        </Form.Item>
        <Form.Item>
          <Form.InputContainer>
            <Form.Input
              id="nickname"
              required
              type="text"
              isError={errors?.nickname?.message}
              aria-invalid={!!errors?.nickname?.message}
              {...register("nickname")}
            />
            <Form.Label id="nickname">{t("form.nickname-label")}</Form.Label>
          </Form.InputContainer>
          {errors?.nickname && (
            <Form.Error>
              {t(errors.nickname.message as ZodI18NHandler)}
            </Form.Error>
          )}
        </Form.Item>
        <Form.Item>
          <Form.InputContainer>
            <Form.Input
              id="password"
              type={`${isPasswordShow ? "text" : "password"}`}
              required
              isError={errors?.password?.message}
              aria-invalid={!!errors?.password?.message}
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
        <Form.Item>
          <Form.InputContainer>
            <Form.Input
              id="confirmPassword"
              type="password"
              required
              {...register("confirmPassword")}
              aria-invalid={!!errors?.confirmPassword?.message}
            />
            <Form.Label id="confirmPassword">
              {t("form.confirm-password-label")}
            </Form.Label>
          </Form.InputContainer>
          {errors?.confirmPassword && (
            <Form.Error>
              {t(errors.confirmPassword.message as ZodI18NHandler)}
            </Form.Error>
          )}
        </Form.Item>
        <Form.Submit>
          {isRegistering ? <Loader /> : t("form.register-submit")}
        </Form.Submit>
        {signupError && (
          <div className="text-center">
            <Form.Error>{t(signupError.generateError())}</Form.Error>
          </div>
        )}
      </Form>
    </div>
  );
};
