import { useState } from "react";
import { Button } from "../../ui/Button";
import { CustomLink } from "../../ui/CustomLink";
import { HoverProfile } from "./HoverProfile";
import { Profile } from "./schema/ProfilesSchema";

export const ProposedProfile = ({ avatar_url, user_name }: Profile) => {
  const [isHover, setIsHover] = useState(false);

  const hover = () => setIsHover(true);
  const unhover = () => setIsHover(false);

  return (
    <div
      onMouseLeave={() => unhover()}
      className="relative flex items-center gap-2 justify-between self-stretch"
    >
      <div className="flex items-center gap-4">
        <CustomLink
          to={`/dashboard/${user_name}`}
          modifier="avatar"
          onMouseEnter={() => hover()}
        >
          <img
            width={48}
            height={48}
            className="rounded-full"
            src={avatar_url}
            alt={user_name}
          />
        </CustomLink>
        <div className="flex flex-col">
          <CustomLink
            to={`/dashboard/${user_name}`}
            modifier="avatar-name"
            onMouseEnter={() => hover()}
          >
            {user_name}
          </CustomLink>
          <p className="text-sm text-stone-500">Propozycje dla Ciebie</p>
        </div>
      </div>
      <Button modifier="link">Obserwuj</Button>
      {isHover && <HoverProfile user_name={user_name} />}
    </div>
  );
};
