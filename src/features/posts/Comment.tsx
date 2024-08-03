import { FaRegHeart } from "react-icons/fa";
import { Button } from "../../ui/Button";
import { useUserByID } from "../authentication/queries/useUserByID";
import { formatDistanceToNow } from "date-fns";
import { getDateFnsLocaleByActiveLanguage } from "./helpers/dateLocale";

type CommentProps = {
  comment: string;
  user_id: string;
  created_at?: string;
};

export const Comment = ({ comment, user_id, created_at }: CommentProps) => {
  const { user } = useUserByID(user_id);

  const formatedDate = created_at
    ? formatDistanceToNow(new Date(created_at), {
        locale: getDateFnsLocaleByActiveLanguage(navigator.language),
        addSuffix: true,
      })
    : null;

  return (
    <div className="grid grid-cols-[24px_1fr_auto] gap-2">
      <img
        src={user?.avatar_url}
        alt=""
        width={24}
        height={24}
        className="w-6 h-6 rounded-full"
      />
      <p className="text-sm mb-3">
        <strong className="text-stone-950 font-semibold text-xs mr-2">
          {user?.fullName}
        </strong>
        {comment}
      </p>
      {formatedDate && (
        <div className="col-start-1 -col-end-1 text-xs text-stone-700 flex items-center gap-3">
          <p>{formatedDate}</p>
          <p>3 polubień</p>
          <p>Odpowiedz</p>
        </div>
      )}
      <div className="col-start-3 col-end-4 row-start-1 flex items-center justify-center">
        <Button modifier="close">
          <FaRegHeart className="text-sm" />
        </Button>
      </div>
    </div>
  );
};
