import { useTranslation } from "react-i18next";
import { Form } from "../../../ui";
import { ChangeEvent, useState } from "react";
import { useChangeChatName } from "../mutations/useChangeChatName";

export type EditChatNameData = {
  chatId: number;
  name?: string;
};

export const EditChatName = ({ name, chatId }: EditChatNameData) => {
  const [chatName, setChatName] = useState(name);
  const { t } = useTranslation();
  const { change } = useChangeChatName(chatId);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setChatName(ev.target.value);
  };

  const handleBlur = () => {
    change({ chatId, name: chatName });
  };

  return (
    <div className="flex flex-col gap-2">
      <Form.InputContainer>
        <Form.Input
          id="name"
          required
          type="text"
          value={chatName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <Form.Label id="name">{t("messages.name")}</Form.Label>
      </Form.InputContainer>
    </div>
  );
};
