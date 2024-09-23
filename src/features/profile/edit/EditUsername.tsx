import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../../ui/form/Form";
import {
  EditUsernameSchema,
  EditUsernameT,
} from "../schema/EditUsernameSchema";
import { useForm } from "react-hook-form";
import { useUpdateUserData } from "./mutations/useUpdateUserData";
import { useTranslation } from "react-i18next";

type EditUsernameProps = {
  fullName: string;
  user_name: string;
};

export const EditUsername = ({ fullName, user_name }: EditUsernameProps) => {
  const { handleSubmit, register } = useForm<EditUsernameT>({
    resolver: zodResolver(EditUsernameSchema),
    defaultValues: {
      fullName,
    },
  });
  const { t } = useTranslation();

  const { update } = useUpdateUserData(user_name);

  const submitHandler = ({ fullName }: EditUsernameT) => {
    update({ fullName });
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">{t("profile.name")}</h2>
      <Form onSubmit={handleSubmit(submitHandler)}>
        <Form.Item>
          <Form.InputContainer>
            <Form.Input
              id="fullname"
              required
              type="text"
              {...register("fullName")}
            />
            <Form.Label id="fullname">{t("profile.fullName")}</Form.Label>
          </Form.InputContainer>
        </Form.Item>
        <Form.Submit>{t("profile.name")}</Form.Submit>
      </Form>
    </>
  );
};
