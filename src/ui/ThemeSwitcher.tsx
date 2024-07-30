import { FaAffiliatetheme } from "react-icons/fa";

export const ThemeSwitcher = () => {
  return (
    <div className="relative rounded-sm border bg-stone-200 text-stone-950">
      <FaAffiliatetheme
        className="absolute left-2 top-1/2 -translate-y-1/2 text-xl"
        aria-label="Zmień motyw"
      />

      <label htmlFor="language" className="sr-only">
        Zmień motyw
      </label>
      <select
        name="language"
        id="language"
        className="rounded-sm bg-transparent px-10 py-4 text-lg transition focus:outline-none focus:ring focus:ring-slate-50"
      >
        <option value="light" className="text-slate-900">
          Jasny
        </option>
        <option value="dark" className="text-slate-900">
          Ciemny
        </option>
      </select>
    </div>
  );
};
