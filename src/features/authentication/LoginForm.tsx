import { GlobalRoutes } from "../../typing/routes";
import { CustomLink } from "../../ui/CustomLink";
import { Divider } from "../../ui/Divider";
import { useFormContext } from "../../ui/form/context/useFormContext";
import { Form } from "../../ui/form/Form";
import { FaGithub } from "react-icons/fa6";

export const LoginForm = () => {
  const { isPasswordShow } = useFormContext();

  return (
    <div className="w-full">
      <Form onSubmit={() => {}}>
        <Form.Item>
          <Form.InputContainer>
            <Form.Input id="email" required type="text" autoComplete="email" />
            <Form.Label id="email">Email address</Form.Label>
          </Form.InputContainer>
        </Form.Item>
        <Form.Item>
          <Form.InputContainer>
            <Form.Input
              id="password"
              type={`${isPasswordShow ? "text" : "password"}`}
              required
            />
            <Form.Label id="password">Hasło</Form.Label>
            <Form.Icons>
              <Form.TogglePassword />
            </Form.Icons>
          </Form.InputContainer>
        </Form.Item>
        <Form.Submit>Zaloguj się</Form.Submit>
      </Form>
      <div className="mb-8">
        <Divider text="Lub" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4 mb-8">
        <CustomLink to={GlobalRoutes.Home} modifier="text">
          <FaGithub className="fill-blue-600 text-lg" />
          Zaloguj się przez GitHub
        </CustomLink>
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
