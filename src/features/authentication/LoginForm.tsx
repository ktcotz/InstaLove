import { useFormContext } from "../../ui/form/context/useFormContext";
import { Form } from "../../ui/form/Form";

export const LoginForm = () => {
  const { isPasswordShow } = useFormContext();

  return (
    <Form onSubmit={() => {}}>
      <Form.Item>
        <Form.InputContainer>
          <Form.Input id="email" required type="text" autoComplete="email" />
          <Form.Label id="email">Email address</Form.Label>
        </Form.InputContainer>
        <Form.Error>Error</Form.Error>
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
        <Form.Error>Error</Form.Error>
      </Form.Item>
    </Form>
  );
};
