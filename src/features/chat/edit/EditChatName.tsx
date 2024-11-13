import { useTranslation } from "react-i18next";
import { Form } from "../../../ui";

export const EditChatName = () => {
  const { t } = useTranslation();

  return (
    <Form>
      <Form.InputContainer>
        <Form.Input name="name" type="text" required defaultValue={""} />
        <Form.Label id="name">{t("messages.name")}</Form.Label>
      </Form.InputContainer>
    </Form>
  );
};
