import { HiLockClosed } from "react-icons/hi";

export const PrivateProfile = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-4 text-center">
      <div className="aspect-square border-4 border-blue-400 w-16 h-16 rounded-full flex items-center justify-center">
        <HiLockClosed aria-label="Konto prywatne" className="text-3xl" />
      </div>
      <h2 className="font-semibold text-lg">To konto jest prywatne</h2>
      <p className="text-stone-600 ">
        Obserwuj to konto, aby być na bieżąco z aktywnościami tego konta
      </p>
    </div>
  );
};
