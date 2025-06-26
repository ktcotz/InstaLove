import { supabase } from "../../../../lib/supabase/supabase";
import { CustomError } from "../../../../utils/CustomErrors";
import { createThumbnail, validateImage } from "../utils/image";

type UpdateAvatarData = {
  file: File;
  user_id: string;
};

export const updateAvatar = async ({ file, user_id }: UpdateAvatarData) => {
  if (!file.type.startsWith("image/")) {
    throw new CustomError({
      message: "Invalid file type. Only images are allowed.",
    });
  }

  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  if (file.size > MAX_FILE_SIZE) {
    throw new CustomError({
      message: "File too large. Must be smaller than 2MB.",
    });
  }

  await validateImage(file, 1024, 1024, 1.5);

  const thumbnail = await createThumbnail(file, 128, 128, "contain");

  const imageName = `avatar-${user_id}.png`;

  const { error: storageError } = await supabase.storage
    .from(`avatars/${user_id}`)
    .upload(imageName, thumbnail, {
      upsert: true,
      contentType: file.type,
    });
  if (storageError) {
    throw new CustomError({
      message: `Error uploading avatar: ${storageError.message}`,
    });
  }

  const { data: signedUrlData } = await supabase.storage
    .from(`avatars/${user_id}`)
    .createSignedUrl(imageName, 365 * 24 * 60 * 60);
  if (!signedUrlData) {
    throw new CustomError({ message: "Error creating signed URL for avatar." });
  }

  const { error } = await supabase
    .from("users")
    .update({ avatar_url: signedUrlData.signedUrl })
    .eq("user_id", user_id);
  if (error) {
    throw new CustomError({
      message: `Error updating user avatar in database: ${error.message}`,
    });
  }

  return { avatar_url: signedUrlData.signedUrl };
};
