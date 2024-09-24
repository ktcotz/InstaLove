import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";
import { GetProfileStoriesData } from "../queries/useGetProfileStories";
import { StorieDTO, Stories } from "../schema/StorieSchema";

export const addStorie = async ({
  post_image,
  user_id,
  description,
  disableComments,
  disableLike,
  type,
  music,
}: StorieDTO & { post_image: File }) => {
  const imageName = `stories-${post_image.name}`;

  const { error: storageError } = await supabase.storage
    .from(user_id)
    .upload(`stories/${imageName}`, post_image, {
      upsert: true,
    });

  const { data: signedUrl } = await supabase.storage
    .from(user_id)
    .createSignedUrl(`stories/${imageName}`, 365 * 24 * 60 * 60);

  if (!signedUrl) return;

  if (storageError) {
    throw new CustomError({
      message: storageError.message,
    });
  }

  const { data: stories } = await supabase
    .from("stories")
    .select("*")
    .eq("user_id", user_id);

  const addObject =
    type === "post"
      ? {
          user_id,
          disableComments,
          disableLike,
          description,
          post_url: signedUrl.signedUrl,
          type,
          music,
        }
      : {
          user_id,
          disableComments,
          disableLike,
          description,
          video_url: signedUrl.signedUrl,
          type,
          music,
        };

  const { data, error } = await supabase
    .from("stories")
    .insert([
      {
        ...addObject,
        inner_id: stories && stories.length > 0 ? user_id : null,
      },
    ])
    .select();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return data;
};

export const getAllStories = async () => {
  const { data: stories, error } = await supabase
    .from("stories")
    .select("*")
    .is("inner_id", null);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const parsed = Stories.parse(stories);

  return parsed;
};

export const getYoutubeTitle = async ({
  youtube_id,
}: {
  youtube_id: string | null;
}) => {
  try {
    const id = youtube_id?.slice(
      youtube_id.indexOf("v=") + 2,
      youtube_id.indexOf("&")
    );

    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${
        import.meta.env.VITE_YOUTUBE_API_KEY
      }&part=snippet`
    );

    if (!res.ok) {
      throw new CustomError({
        message: "No youtube video found!",
      });
    }

    const data = await res.json();

    return data.items[0];
  } catch (err) {
    if (err instanceof CustomError) {
      return err;
    }
  }
};

export const getStoriesByProfileID = async ({
  profileID,
}: GetProfileStoriesData) => {
  const { data: stories, error } = await supabase
    .from("stories")
    .select("*")
    .eq("user_id", profileID);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const parsed = Stories.parse(stories);

  return parsed;
};
