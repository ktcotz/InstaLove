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

export const RegisterForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(RegisterFormSchema),
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
        <Form.Item>
          <Form.InputContainer>
            <Form.Input
              id="confirmPassword"
              type="password"
              required
              {...register("confirmPassword")}
            />
            <Form.Label id="confirmPassword">Confirm Password</Form.Label>
          </Form.InputContainer>
          {errors?.confirmPassword && (
            <Form.Error>{errors.confirmPassword.message}</Form.Error>
          )}
        </Form.Item>
        <Form.Submit>Zarejestruj się</Form.Submit>
      </Form>
      <div className="mb-8">
        <Divider text="Lub" />
      </div>

      <CustomLink to={GlobalRoutes.Home} modifier="text">
        <FaGithub className="fill-blue-600 text-lg" aria-label="GitHub" />
        Zarejestruj się przez GitHub
      </CustomLink>
    </div>
  );
};
