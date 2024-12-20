import { Divider, CustomLink, Form, Loader } from "./../../ui";
import { useFormContext } from "../../ui/form/context/useFormContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, LoginSchema } from "./schema/LoginFormSchema";
import { ZodI18NHandler } from "../../lib/i18n/i18n.types";
import { useTranslation } from "react-i18next";
import { useLogin } from "./mutations/useLogin";
import { GlobalRoutes } from "../../typing/routes";
import { useAuth } from "./context/useAuth";

export const LoginForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "tester@wp.pl",
      password: "123456",
    },
  });
  const { t } = useTranslation();
  const { login, isLogin, loginError } = useLogin();
  const { isPasswordShow } = useFormContext();
  const { setupUser } = useAuth();

  const submitHandler = ({ email, password }: LoginSchema) => {
    login(
      { email, password },
      {
        onSuccess: (user) => {
          setupUser(user.user);
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
        <Form.Submit>
          {isLogin ? <Loader /> : t("form.login-submit")}
        </Form.Submit>
        {loginError && (
          <div className="text-center">
            <Form.Error>{t(loginError.generateError())}</Form.Error>
          </div>
        )}
      </Form>
      <div className="my-8">
        <Divider text={t("utils.divider")} />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 mb-8">
        <CustomLink to={GlobalRoutes.ForgotPassword} modifier="small-text">
          {t("links.forgot-password")}
        </CustomLink>
      </div>
      <p className="text-sm text-center text-stone-600 font-medium dark:text-stone-50">
        {t("utils.home-text")}
      </p>
    </div>
  );
};
