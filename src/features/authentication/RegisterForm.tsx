import { GlobalRoutes } from "../../typing/routes";
import { CustomLink } from "../../ui/CustomLink";
import { Divider } from "../../ui/Divider";
import { useFormContext } from "../../ui/form/context/useFormContext";
import { Form } from "../../ui/form/Form";
import { FaGithub } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormSchema,
  RegisterSchema,
} from "./schema/RegisterFormSchema";
import { useTranslation } from "react-i18next";
import { ZodI18NHandler } from "../../lib/i18n/i18n.types";
import { useRegister } from "./mutations/useRegister";
import { Loader } from "../../ui/Loader";

export const RegisterForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const { signup, isRegistering, signupError } = useRegister();

  const { t } = useTranslation();
  const { isPasswordShow } = useFormContext();

  const submitHandler = ({ email, password }: RegisterSchema) => {
    signup(
      { email, password },
      {
        onSuccess: () => {
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
              id="email"
              required
              type="text"
              autoComplete="email"
              isError={errors?.email?.message}
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
              id="password"
              type={`${isPasswordShow ? "text" : "password"}`}
              required
              isError={errors?.password?.message}
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
      <div className="mb-8">
        <Divider text={t("utils.divider")} />
      </div>

      <CustomLink to={GlobalRoutes.Home} modifier="text">
        <FaGithub className="fill-blue-600 text-lg" aria-label="GitHub" />
        {t("links.register-by-github")}
      </CustomLink>
    </div>
  );
};
