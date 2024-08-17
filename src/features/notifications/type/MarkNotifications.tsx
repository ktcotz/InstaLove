import { formatDistanceToNow } from "date-fns";
import { getDateFnsLocaleByActiveLanguage } from "../../posts/helpers/dateLocale";
import { Profile } from "../../profile/schema/ProfilesSchema";
import { CustomLink } from "../../../ui/CustomLink";

type MarkNotificationProps = {
  created_at?: string;
  user?: Profile;
  post_id: number | null;
  receiver?: Profile;
};

export const MarkNotifications = ({
  created_at,
  user,
  receiver,
  post_id,
}: MarkNotificationProps) => {
  const formatedDate = created_at
    ? formatDistanceToNow(new Date(created_at), {
        locale: getDateFnsLocaleByActiveLanguage(navigator.language),
        addSuffix: true,
      })
    : null;

  return (
    <CustomLink
      modifier="notification"
      to={`/dashboard/${receiver?.user_name}/post/${post_id}`}
    >
      <img
        src={user?.avatar_url}
        alt={user?.user_name}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full"
      />
      <div className="text-xs">
        <p className="text-xs">
          <strong>{user?.user_name}</strong>
        </p>
        <p className="text-stone-900">oznaczył Cię pod postem</p>
        <p className="text-stone-600">{formatedDate}</p>
      </div>
    </CustomLink>
  );
};
