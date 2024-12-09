import { useTranslation } from "react-i18next";
import { useGetReactions } from "../queries/useGetReactions";
import { Loader } from "../../../ui";
import { Reaction } from "./Reaction";

type AllReactionsProps = {
  id: number;
};

export const AllReactions = ({ id }: AllReactionsProps) => {
  const { reactions, isLoading } = useGetReactions({ message_id: id });
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center rounded-md shadow-lg bg-stone-100 dark:bg-stone-950">
      <div className="w-full text-center py-4 border-b border-stone-300 dark:border-stone-50 ">
        <h2 className="font-semibold dark:text-stone-50">
          {t("messages.reactions")}
        </h2>
      </div>
      <div className="p-1 sm:p-3 w-full flex flex-col gap-3">
        {isLoading && (
          <div className="flex items-center justify-center py-4">
            <Loader />
          </div>
        )}
        {!isLoading &&
          reactions!.length > 0 &&
          reactions?.map((reaction) => (
            <Reaction {...reaction} key={reaction.id} message_id={id} />
          ))}
      </div>
    </div>
  );
};
