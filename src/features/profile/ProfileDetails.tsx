import { useDropzone } from "react-dropzone";
import { FaCamera } from "react-icons/fa6";
import { CustomLink } from "../../ui/CustomLink";
import { useProfile } from "./queries/useProfile";
import { useProfileParams } from "./queries/useProfileParams";
import { Loader } from "../../ui/Loader";
import { useUser } from "../authentication/queries/useUser";
import { useGetPosts } from "../posts/queries/useGetPosts";
import { Wrapper } from "../../ui/Wrapper";
import { CiBookmark, CiViewBoard, CiVideoOn } from "react-icons/ci";
import { Outlet } from "react-router";

export const ProfileDetails = () => {
  const { profile } = useProfileParams();
  const { user: currentUser } = useUser();
  const { data: user, isLoading } = useProfile(profile);

  const { data: posts, isLoading: isPostsLoading } = useGetPosts(user?.user_id);

  const { getRootProps, getInputProps } = useDropzone();

  if (isLoading || isPostsLoading)
    return (
      <div className="p-4">
        <Loader />
      </div>
    );

  if (!user) return null;

  return (
    <>
      <Wrapper modifier="details">
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
                <CustomLink to="/dashboard/profile/edit" modifier="primary">
                  Edytuj profil
                </CustomLink>
              )}
            </div>
            <div className="flex items-center justify-between gap-3">
              <p className="flex gap-1 flex-col items-center sm:flex-row text-stone-700">
                Posty
                <strong className="font-medium text-stone-950">
                  {posts?.count}
                </strong>
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
            <div className="py-4">
              <p className="max-w-prose text-wrap text break-words">
                BioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBioBio
              </p>
            </div>
          </div>
        </div>
      </Wrapper>

      <Wrapper>
        <div className="flex items-center justify-center gap-12 border-t border-x-stone-300">
          <CustomLink
            to="posts"
            modifier="profile-details"
            type="active-link"
            activeClass="border-t border-stone-950 font-semibold"
          >
            <CiViewBoard aria-label="Posts" className="text-xl" />
            Posty
          </CustomLink>
          <CustomLink
            to="reels"
            modifier="profile-details"
            type="active-link"
            activeClass="border-t border-stone-950 font-semibold"
          >
            <CiVideoOn aria-label="Posts" className="text-xl" />
            Reels
          </CustomLink>
          {currentUser?.id === user.user_id && (
            <CustomLink
              to="bookmarks"
              modifier="profile-details"
              type="active-link"
              activeClass="border-t border-stone-950 font-semibold"
            >
              <CiBookmark aria-label="Bookmarks" className="text-xl" />
              Zapisane
            </CustomLink>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <Outlet />
        </div>
      </Wrapper>
    </>
  );
};
