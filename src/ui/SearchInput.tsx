import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";

type SearchInputModifier = "with-reset";

type SearchInputProps = {
  query: string;
  handleQuery: (value: string) => void;
  modifier?: SearchInputModifier;
  upFocus: () => void;
};

export type SearchQuery = {
  query?: string;
};

export const SearchInput = ({
  query,
  handleQuery,
  modifier,
  upFocus,
}: SearchInputProps) => {
  const { t } = useTranslation();

  return (
    <div className="relative">
      <input
        type="text"
        className={`peer w-full rounded-md border border-stone-300 pt-4 p-2 text-stone-950 transition-all ${
          modifier === "with-reset" ? "pr-8" : ""
        }`}
        id="search"
        required
        value={query}
        onChange={(ev) => handleQuery(ev.target.value)}
        onClick={upFocus}
      />
      <label
        htmlFor="search"
        className="flex items-center gap-1 absolute left-0 top-1/2 -translate-y-1/2 px-2 text-sm text-stone-900 transition-all  peer-valid:top-3 peer-focus:top-3 peer-focus:rounded-sm peer-valid:text-xs peer-focus:text-xs"
      >
        <CiSearch aria-label={t("navigation.search")} />
        {t("navigation.search")}
      </label>
    </div>
  );
};
