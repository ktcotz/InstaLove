import { useDropzone } from "react-dropzone";
import { FaCamera } from "react-icons/fa6";
import { useUser } from "../../authentication/queries/useUser";
import { useProfile } from "../queries/useProfile";

type AvatarProps = {
  overlay?: boolean;
  size: number;
};

export const Avatar = ({ overlay = false, size }: AvatarProps) => {
  const { user } = useUser();
  const { data: current } = useProfile(user?.user_metadata.user_name);
  const { getRootProps, getInputProps } = useDropzone();

  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      className="cursor-pointer"
    >
      <input {...getInputProps()} />
      <div className="relative rounded-full flex items-center justify-center lg:items-start lg:justify-start">
        <img
          src={current?.avatar_url}
          alt={current?.user_name}
          width={size}
          height={size}
          className="rounded-full"
        />
        {overlay && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[178px] h-[178px] lg:w-full lg:h-full flex items-center justify-center bg-stone-500/70 rounded-full cursor-pointer">
            <FaCamera className="text-5xl" aria-label="Add avatar" />
          </div>
        )}
      </div>
    </div>
  );
};
