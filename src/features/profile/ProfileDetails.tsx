import { useDropzone } from "react-dropzone";
import { FaCamera } from "react-icons/fa6";
import { CustomLink } from "../../ui/CustomLink";
import { useProfile } from "./queries/useProfile";
import { useProfileParams } from "./queries/useProfileParams";
import { Loader } from "../../ui/Loader";
import { useUser } from "../authentication/queries/useUser";

export const ProfileDetails = () => {
  const { profile } = useProfileParams();
  const { user: currentUser } = useUser();
  const { data: user, isLoading } = useProfile(profile);

  const { getRootProps, getInputProps } = useDropzone();

  if (isLoading) return <Loader />;

  if (!user) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-16 2xl:gap-32">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="relative rounded-full flex items-center justify-center lg:items-start lg:justify-start">
          <img
            src={user?.avatar_url}
            alt={user?.user_name}
            width={178}
            height={178}
            className="rounded-full"
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[178px] h-[178px] lg:w-full lg:h-full flex items-center justify-center bg-stone-500/70 rounded-full cursor-pointer">
            <FaCamera className="text-5xl" aria-label="Add avatar" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-12 grow">
        <div className="flex items-center gap-3 justify-between">
          <p className="text-xl font-medium">{user?.user_name}</p>
          {currentUser!.id === user!.user_id && (
            <CustomLink to={"edit"} modifier="primary">
              Edytuj profil
            </CustomLink>
          )}
        </div>
        <div className="flex items-center justify-between gap-3">
          <p className="flex gap-1 flex-col items-center sm:flex-row text-stone-700">
            Posty <strong className="font-medium text-stone-950">4</strong>
          </p>
          <p className="flex gap-1 flex-col items-center sm:flex-row text-stone-700">
            <strong className="font-medium text-stone-950">291</strong>
            obserwujących
          </p>
          <p className="flex gap-1 flex-col items-center sm:flex-row text-stone-700">
            Obserwowani
            <strong className="font-medium text-stone-950">664</strong>
          </p>
        </div>
        <div className="border-b border-stone-300 py-4 sm:border-0">
          <p className="max-w-prose text-wrap text break-words">
            BioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBio
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
          <div className="relative">
            <img
              src="https://picsum.photos/310/310"
              alt=""
              width={310}
              height={310}
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-stone-950/20">
              asd
            </div>
          </div>
          <img
            src="https://picsum.photos/310/310"
            alt=""
            width={310}
            height={310}
          />
          <img
            src="https://picsum.photos/310/310"
            alt=""
            width={310}
            height={310}
          />
          <img
            src="https://picsum.photos/310/310"
            alt=""
            width={310}
            height={310}
          />
        </div>
      </div>
    </div>
  );
};
