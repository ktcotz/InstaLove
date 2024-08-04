import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";
import { UserID } from "../../authentication/services/services";
import { Comment, CommentsSchema } from "../schema/CommentSchema";
import { PostsReelsSchema, PostsSchema } from "../schema/PostsSchema";

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

  console.log(storageError);

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

export const getReels = async ({ user_id }: UserID) => {
  const { data: reels, error } = await supabase
    .from("reels")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const parsed = PostsReelsSchema.parse(reels);

  return parsed;
};

export const addCommentToPost = async (data: Comment) => {
  const { data: comment, error } = await supabase
    .from("comments")
    .insert([data])
    .select();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return comment;
};

export const getComments = async ({ post_id }: { post_id: number }) => {
  const {
    data: comments,
    count,
    error,
  } = await supabase
    .from("comments")
    .select("*", { count: "exact" })
    .eq("post_id", post_id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const parsed = CommentsSchema.parse({ count, comments });

  return parsed;
};
