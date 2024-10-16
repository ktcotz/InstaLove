import { useTranslation } from "react-i18next";
import { Button, SearchInput } from "../../ui";

export const AddUsers = () => {
  const { t } = useTranslation();
  return (
    <div className="rounded-md shadow-lg bg-stone-100 dark:bg-stone-950">
      <h2 className="text-stone-950 dark:text-stone-50 text-center font-semibold py-4 border-b border-stone-300 dark:border-stone-50">
        {t("messages.addTitle")}
      </h2>
      <div className="border-b border-stone-300 dark:border-stone-50 p-4 flex flex-wrap gap-4 items-center">
        <span className="font-semibold">{t("messages.toFriend")}:</span>
        <div className="flex gap-4">
          <h1>ASD</h1>
        </div>
        <div className="min-w-48 md:min-w-96 grow">
          <SearchInput />
        </div>
      </div>
      <div className="h-[450px] overflow-y-scroll mb-4">
        <div className="p-4">
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
        </div>
      </div>
      <Button modifier="add-chat" disabled>
        Czat
      </Button>
    </div>
  );
};
