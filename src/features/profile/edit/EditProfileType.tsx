import { FaRegUser } from "react-icons/fa";
import { useUpdateUserData } from "./mutations/useUpdateUserData";
import { ChangeEvent } from "react";

type EditProfileTypeProps = {
  type: "public" | "private";
  id: string;
};

export const EditProfileType = ({ type, id }: EditProfileTypeProps) => {
  const { update } = useUpdateUserData(id);

  const handleChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    const type = ev.target.value;

    if (type === "public" || type === "private") {
      update({ type });
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Zmień typ profilu</h2>
      <div className="relative rounded-sm border bg-stone-200 text-stone-950">
        <FaRegUser
          className="absolute left-2 top-1/2 -translate-y-1/2 text-xl"
          aria-label="Zmień typ profilu"
        />

        <label htmlFor="profile-type" className="sr-only">
          Zmień typ profilu
        </label>
        <select
          name="profile-type"
          id="profile-type"
          className="rounded-sm bg-transparent px-10 py-4 text-lg transition focus:outline-none focus:ring focus:ring-slate-50"
          defaultValue={type}
          onChange={handleChange}
        >
          <option value="public" className="text-slate-900">
            Publiczny
          </option>
          <option value="private" className="text-slate-900">
            Prywatny
          </option>
        </select>
      </div>
    </>
  );
};
