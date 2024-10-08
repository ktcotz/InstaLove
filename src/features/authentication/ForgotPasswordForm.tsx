import { Form, Loader } from "./../../ui";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodI18NHandler } from "../../lib/i18n/i18n.types";
import {
  ForgotPasswordSchema,
  ForgotSchema,
} from "./schema/ForgotPasswordSchema";
import { useForgotPassword } from "./mutations/useForgotPassword";

export const ForgotPasswordForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<ForgotSchema>({
    resolver: zodResolver(ForgotPasswordSchema),
  });
  const { forgot, isForgotLoading, forgotError } = useForgotPassword();
  const { t } = useTranslation();

  const submitHandler = ({ email }: ForgotSchema) => {
    forgot({ email });
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
        <Form.Submit>
          {isForgotLoading ? <Loader /> : t("form.forgot-password")}
        </Form.Submit>
        {forgotError && (
          <div className="text-center">
            <Form.Error>{t(forgotError.generateError())}</Form.Error>
          </div>
        )}
      </Form>
    </div>
  );
};
