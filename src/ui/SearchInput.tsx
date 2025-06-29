import { useTranslation } from "react-i18next";
import { CiSearch } from "react-icons/ci";
import { useState, useEffect } from "react";

type SearchInputModifier = "with-reset";

type SearchInputProps = {
  query: string;
  handleQuery: (value: string) => void;
  modifier?: SearchInputModifier;
  upFocus?: () => void;
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

  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  useEffect(() => {
    const handler = setTimeout(() => {
      handleQuery(localQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [localQuery, handleQuery]);

  return (
    <div className="relative">
      <input
        type="text"
        className={`dark:border-stone-50 dark:bg-stone-950 peer w-full rounded-md border border-stone-300 pt-4 p-2 text-stone-950 dark:text-stone-50 transition-all ${
          modifier === "with-reset" ? "pr-8" : ""
        }`}
        id="search"
        required
        value={localQuery}
        onChange={(ev) => setLocalQuery(ev.target.value)}
        onClick={upFocus}
      />
      <label
        htmlFor="search"
        className="flex items-center gap-1 absolute left-0 top-1/2 -translate-y-1/2 px-2 text-sm text-stone-900 dark:text-stone-50 transition-all  peer-valid:top-3 peer-focus:top-3 peer-focus:rounded-sm peer-valid:text-xs peer-focus:text-xs"
      >
        <CiSearch aria-label={t("navigation.search")} />
        {t("navigation.search")}
      </label>
    </div>
  );
};