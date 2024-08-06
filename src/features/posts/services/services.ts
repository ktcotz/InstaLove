import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";
import { UserID } from "../../authentication/services/services";
import { MAX_COMMENTS_POST } from "../IndividualModalPost";
import { Bookmark } from "../mutations/useBookmark";
import { CommentLikes } from "../queries/useGetCommentLikes";
import { PostLikes } from "../queries/useGetPostLikes";
import { Comment, CommentsSchema } from "../schema/CommentSchema";
import { Like, LikesSchema } from "../schema/LikeSchema";
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

export const getComments = async ({
  post_id,
  page = 0,
}: {
  post_id: number;
  page?: number;
}) => {
  const {
    data: comments,
    count,
    error,
  } = await supabase
    .from("comments")
    .select("*", { count: "exact" })
    .eq("post_id", post_id)
    .order("created_at", { ascending: false })
    .range(page * MAX_COMMENTS_POST, (page + 1) * MAX_COMMENTS_POST - 1);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const parsed = CommentsSchema.parse({ count, comments });

  return parsed;
};

export const manageLike = async (like: Like) => {
  const { data: likes, error: isLike } = await supabase
    .from("likes")
    .select("*")
    .eq("user_id", like.user_id)
    .eq(
      like.comment_id ? "comment_id" : "post_id",
      like.comment_id ? like.comment_id : like.post_id
    );

  if (likes && likes.length > 0) {
    return await supabase.from("likes").delete().eq("id", likes[0].id);
  }

  if (isLike) {
    throw new CustomError({
      message: isLike.message,
    });
  }

  const { data, error } = await supabase.from("likes").insert([like]).select();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return data;
};

export const getPostsLikes = async ({ post_id }: PostLikes) => {
  const {
    data: likes,
    count,
    error,
  } = await supabase
    .from("likes")
    .select("*", { count: "exact" })
    .eq("post_id", post_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const parsed = LikesSchema.parse(likes);

  return { parsed, count };
};

export const getCommentsLikes = async ({ comment_id }: CommentLikes) => {
  const {
    data: likes,
    count,
    error,
  } = await supabase
    .from("likes")
    .select("*", { count: "exact" })
    .eq("comment_id", comment_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const parsed = LikesSchema.parse(likes);

  return { parsed, count };
};

export const manageBookmark = async (bookmark: Bookmark) => {
  const { data: bookmarks, error: isLike } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", bookmark.user_id)
    .eq("post_id", bookmark.post_id);

  if (bookmarks && bookmarks.length > 0) {
    return await supabase.from("bookmarks").delete().eq("id", bookmarks[0].id);
  }

  if (isLike) {
    throw new CustomError({
      message: isLike.message,
    });
  }

  const { data, error } = await supabase
    .from("bookmarks")
    .insert([bookmark])
    .select();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return data;
};

export const getBookmarks = async ({ user_id }: UserID) => {
  const { data: bookmarks, error } = await supabase
    .from("bookmarks")
    .select("*,post_id(*)")
    .eq("user_id", user_id);

  console.log(bookmarks);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return bookmarks;
};

export const getBookmark = async ({ user_id, post_id }: Bookmark) => {
  const { data: bookmarks, error } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user_id)
    .eq("post_id", post_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return bookmarks;
};
