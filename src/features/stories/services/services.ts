import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";
import { StorieDTO } from "../schema/StorieSchema";

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
    .insert([addObject])
    .select();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return data;
};
