import { formatDistanceToNow } from "date-fns";
import { getDateFnsLocaleByActiveLanguage } from "../../posts/helpers/dateLocale";
import { Profile } from "../../profile/schema/ProfilesSchema";
import { CustomLink } from "../../../ui/CustomLink";

type ObserveNotificationProps = {
  created_at?: string;
  user?: Profile;
};

export const ObserveNotification = ({
  created_at,
  user,
}: ObserveNotificationProps) => {
  const formatedDate = created_at
    ? formatDistanceToNow(new Date(created_at), {
        locale: getDateFnsLocaleByActiveLanguage(navigator.language),
        addSuffix: true,
      })
    : null;

  return (
    <CustomLink modifier="notification" to={`/dashboard/${user?.user_name}`}>
      <img
        src={user?.avatar_url}
        alt={user?.user_name}
        width={40}
        height={40}
        className="w-10 h-10 rounded-full"
      />
      <div className="text-xs">
        <p className="text-xs text-stone-950">
          <strong>{user?.user_name}</strong>
        </p>
        <p className="text-stone-900">zaobserwował/a Cię</p>
        <p className="text-stone-600">{formatedDate}</p>
      </div>
    </CustomLink>
  );
};
