import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";

type SupabasePost = {
  post_image: File;
  disableComment: boolean;
  disableLike: boolean;
  description: string;
  user_id: string;
  video_url?: string;
  type: "posts" | "reels";
};

export const createPost = async ({
  disableComment,
  disableLike,
  description,
  user_id,
  post_image,
  type,
}: SupabasePost) => {
  const imageName = `${type}-${post_image.name}`;

  const { error: storageError } = await supabase.storage
    .from(user_id)
    .upload(`${type}/${imageName}`, post_image, {
      upsert: true,
    });

  const { data: signedUrl } = await supabase.storage
    .from(user_id)
    .createSignedUrl(`${type}/${imageName}`, 365 * 24 * 60 * 60);

  if (!signedUrl) return;

  if (storageError) {
    throw new CustomError({
      message: storageError.message,
    });
  }

  const addObject =
    type === "posts"
      ? {
          user_id,
          disableComment,
          disableLike,
          description,
          post_url: signedUrl.signedUrl,
        }
      : {
          user_id,
          disableComment,
          disableLike,
          description,
          video_url: signedUrl.signedUrl,
        };

  const { data, error } = await supabase
    .from(type)
    .insert([addObject])
    .select();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return data;
};
