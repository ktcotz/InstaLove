import { useState } from "react";
import { Button } from "../../ui/Button";
import { CustomLink } from "../../ui/CustomLink";
import { HoverProfile } from "./HoverProfile";

export const ProposedProfile = () => {
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
          to={`/profile/`}
          modifier="avatar"
          onMouseEnter={() => hover()}
        >
          <img width={48} height={48} className="rounded-full" />
        </CustomLink>
        <div className="flex flex-col">
          <CustomLink
            to={``}
            modifier="avatar-name"
            onMouseEnter={() => hover()}
          >
            patrasoo
          </CustomLink>
          <p className="text-sm text-stone-500">Propozycje dla Ciebie</p>
        </div>
      </div>
      <Button modifier="link">Obserwuj</Button>
      {isHover && <HoverProfile />}
    </div>
  );
};
