import { GlobalRoutes } from "../../typing/routes";
import { CustomLink } from "../../ui/CustomLink";
import { Divider } from "../../ui/Divider";
import { useFormContext } from "../../ui/form/context/useFormContext";
import { Form } from "../../ui/form/Form";
import { FaGithub } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { LoginFormSchema, LoginSchema } from "./schema/LoginFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export const LoginForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<LoginSchema>({
    resolver: zodResolver(LoginFormSchema),
  });
  const { isPasswordShow } = useFormContext();

  const submitHandler = () => {
    console.log("submit");
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
            <Form.Label id="email">Email address</Form.Label>
          </Form.InputContainer>
          {errors?.email && <Form.Error>{errors.email.message}</Form.Error>}
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
            <Form.Label id="password">Hasło</Form.Label>
            <Form.Icons>
              <Form.TogglePassword />
            </Form.Icons>
          </Form.InputContainer>
          {errors?.password && (
            <Form.Error>{errors.password.message}</Form.Error>
          )}
        </Form.Item>
        <Form.Submit>Zaloguj się</Form.Submit>
      </Form>
      <div className="mb-8">
        <Divider text="Lub" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 mb-8">
        <CustomLink to={GlobalRoutes.Home} modifier="text">
          <FaGithub className="fill-blue-600 text-lg" aria-label="GitHub" />
          Zaloguj się przez GitHub
        </CustomLink>
        <Divider />
        <CustomLink to={GlobalRoutes.Home} modifier="small-text">
          Nie pamiętasz hasła?
        </CustomLink>
      </div>
      <p className="text-sm text-center text-stone-600 font-medium">
        Zaloguj się i korzystaj z pełni InstaLove za darmo.
      </p>
    </div>
  );
};
