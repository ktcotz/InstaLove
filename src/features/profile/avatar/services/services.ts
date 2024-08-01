import { supabase } from "../../../../lib/supabase/supabase";
import { CustomError } from "../../../../utils/CustomErrors";

type UpdateAvatarData = {
  file: File;
  user_id: string;
};

export const updateAvatar = async ({ file, user_id }: UpdateAvatarData) => {
  const imageName = `avatar-${user_id}`;

  const { error: storageError } = await supabase.storage
    .from(`avatars/${user_id}`)
    .upload(imageName, file, {
      upsert: true,
    });

  const { data: signedUrl } = await supabase.storage
    .from(`avatars/${user_id}`)
    .createSignedUrl(imageName, 365 * 24 * 60 * 60);

  if (!signedUrl) return;

  if (storageError) {
    throw new CustomError({
      message: storageError.message,
    });
  }

  const { data, error } = await supabase
    .from("users")
    .update({ avatar_url: signedUrl.signedUrl })
    .eq("user_id", user_id)
    .select();

  console.log(data, error);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return data;
};
