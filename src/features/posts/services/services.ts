import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";
import { UserID } from "../../authentication/services/services";
import { PostsSchema } from "../schema/PostsSchema";

type SupabasePost = {
  post_image: File;
  disableComment: boolean;
  disableLike: boolean;
  description: string;
  user_id: string;
};

export const createPost = async ({
  disableComment,
  disableLike,
  description,
  user_id,
  post_image,
}: SupabasePost) => {
  const imageName = `post-${post_image.name}`;

  const { error: storageError } = await supabase.storage
    .from(user_id)
    .upload(`posts/${imageName}`, post_image);

  const { data: signedUrl } = await supabase.storage
    .from(user_id)
    .createSignedUrl(`posts/${imageName}`, 365 * 24 * 60 * 60);

  if (!signedUrl) return;

  if (storageError) {
    throw new CustomError({
      message: storageError.message,
    });
  }

  const { data, error } = await supabase
    .from("posts")
    .insert([
      {
        user_id,
        disableComment,
        disableLike,
        description,
        post_url: signedUrl.signedUrl,
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

export const getPosts = async ({ user_id }: UserID) => {
  const {
    data: posts,
    error,
    count,
  } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .eq("user_id", user_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const parsed = PostsSchema.parse(posts);

  return { data: parsed, count };
};
