import { FaRegHeart } from "react-icons/fa";
import { Button } from "../../ui/Button";

export const Comment = () => {
  return (
    <div className="grid grid-cols-[24px_1fr_auto] gap-4">
      <img
        src="./images/icon-phones.png"
        alt=""
        width={24}
        height={24}
        className="w-6 h-6 rounded-full"
      />
      <div>
        <p className="text-sm mb-3">
          <strong className="text-stone-950 font-semibold text-xs mr-2">
            lovelybaskets.pl
          </strong>
          Fantastyczne wakacje ,przepiękne zdjęcia i film 👌🏻
        </p>
        <div className="text-xs text-stone-700 flex items-center gap-3">
          <p>19 tyg.</p>
          <p>3 polubień</p>
          <p>Odpowiedz</p>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Button modifier="close">
          <FaRegHeart className="text-sm" />
        </Button>
      </div>
    </div>
  );
};
