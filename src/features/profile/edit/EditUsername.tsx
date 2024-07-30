import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../ui/form/Form";
import {
  EditUsernameSchema,
  EditUsernameT,
} from "../schema/EditUsernameSchema";
import { useForm } from "react-hook-form";

type EditUsernameProps = {
  fullName: string;
};

export const EditUsername = ({ fullName }: EditUsernameProps) => {
  const { handleSubmit, register } = useForm<EditUsernameT>({
    resolver: zodResolver(EditUsernameSchema),
    defaultValues: {
      fullName,
    },
  });

  const submitHandler = ({ fullName }: EditUsernameT) => {
    console.log(fullName);
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Zmień imię i nazwisko</h2>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Item>
          <Form.InputContainer>
            <Form.Input
              id="fullname"
              required
              type="text"
              {...register("fullName")}
            />
            <Form.Label id="fullname">Full name</Form.Label>
          </Form.InputContainer>
        </Form.Item>
        <Form.Submit>Zmień imię i nazwisko</Form.Submit>
      </Form>
    </>
  );
};
