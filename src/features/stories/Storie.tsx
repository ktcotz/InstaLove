import { Button } from "../../ui/Button";

export const Storie = () => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button aria-label="Open storie" modifier="storie">
        <img
          src="https://picsum.photos/56/56"
          alt=""
          className="rounded-full"
        />
      </Button>
      <p className="text-xs text-stone-900">sibusiso10_</p>
    </div>
  );
};
