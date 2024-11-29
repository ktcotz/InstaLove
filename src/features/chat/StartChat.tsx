import { useTranslation } from "react-i18next";
import { PiMessengerLogo } from "react-icons/pi";
import { Button, Modal } from "../../ui";
import { AddUsers } from "./add-user/AddUsers";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
export const StartChat = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const { t } = useTranslation();

  useEffect(() => {
    if(buttonRef.current && name) {
      buttonRef.current.click()
    }
  },[name])
  
  return (
    <div className="p-4 flex flex-col items-center justify-center h-full">
      <div className="rounded-full h-24 w-24 md:h-32 md:w-32 border-2 border-stone-950 dark:border-stone-50 flex items-center justify-center mb-8">
        <PiMessengerLogo className="text-5xl dark:text-stone-50" />
      </div>
      <h2 className="text-xl text-stone-950 dark:text-stone-50 font-medium mb-4">
        {t("messages.startTitle")}
      </h2>
      <p className="text-stone-600 dark:text-stone-300 text-sm mb-8 text-center">
        {t("messages.startDescription")}
      </p>
      <Modal.Open openClass="message-friend">
        <Button modifier="submit" ref={buttonRef}>
          {t("posts.sendMessage")}
        </Button>
      </Modal.Open>
      <Modal.Content
        manageClass="message-friend"
        parentClass="w-full mx-auto max-w-2xl px-4"
      >
        <AddUsers name={name} />
      </Modal.Content>
    </div>
  );
};
