import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";
import { UserID } from "../../authentication/services/types";
import { MAX_COMMENTS_POST } from "../IndividualModalPost";
import { AddViewProps } from "../mutations/useAddView";
import { Bookmark } from "../mutations/useBookmark";
import { DeletePost } from "../mutations/useDeletePost";
import { CommentLikes } from "../queries/useGetCommentLikes";
import { PostLikes } from "../queries/useGetPostLikes";
import { UserPost } from "../queries/useGetUserPost";
import {
  Comment,
  CommentsSchema,
  OnlyCommentsSchema,
} from "../schema/CommentSchema";
import { Like, LikesSchema } from "../schema/LikeSchema";
import {
  GeneralsPostsSchema,
  PostsReelsSchema,
  PostsSchema,
} from "../schema/PostsSchema";

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

export const addCommentToPost = async ({
  comment,
  post_id,
  user_id,
  comment_id,
}: Comment) => {
  const insertData = comment_id
    ? { comment, user_id, post_id: null, comment_id }
    : { comment, post_id, user_id, comment_id: null };

  const { data: comments, error } = await supabase
    .from("comments")
    .insert([insertData])
    .select();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return comments;
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
  const query =
    bookmark.type === "post"
      ? supabase
          .from("bookmarks")
          .select("*")
          .eq("user_id", bookmark.user_id)
          .eq("post_id", bookmark.post_id)
      : supabase
          .from("bookmarks")
          .select("*")
          .eq("user_id", bookmark.user_id)
          .eq("reel_id", bookmark.post_id);

  const { data: bookmarks, error: isLike } = await query;

  if (bookmarks && bookmarks.length > 0) {
    return await supabase.from("bookmarks").delete().eq("id", bookmarks[0].id);
  }

  if (isLike) {
    throw new CustomError({
      message: isLike.message,
    });
  }

  const insertBookmark =
    bookmark.type === "post"
      ? { user_id: bookmark.user_id, post_id: bookmark.post_id }
      : { user_id: bookmark.user_id, reel_id: bookmark.post_id };

  const { data, error } = await supabase
    .from("bookmarks")
    .insert([insertBookmark])
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
    .select("*,post_id(*),reel_id(*)")
    .eq("user_id", user_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return bookmarks;
};

export const getBookmark = async ({ user_id, post_id, type }: Bookmark) => {
  const query =
    type === "post"
      ? supabase
          .from("bookmarks")
          .select("*")
          .eq("user_id", user_id)
          .eq("post_id", post_id)
      : supabase
          .from("bookmarks")
          .select("*")
          .eq("user_id", user_id)
          .eq("reel_id", post_id);

  const { data: bookmarks, error } = await query;

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return bookmarks;
};

export const addViewReel = async ({ reel_id, user_id }: AddViewProps) => {
  const { data: reel, error } = await supabase
    .from("reels")
    .select("*")
    .eq("user_id", user_id)
    .eq("id", reel_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const { error: updatedError } = await supabase
    .from("reels")
    .update({ views: reel[0]!.views + 1 })
    .eq("id", reel_id)
    .select();

  if (updatedError) {
    throw new CustomError({
      message: updatedError.message,
    });
  }

  return reel;
};

export const getUserPost = async ({ post_id, user_id }: UserPost) => {
  const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", user_id)
    .eq("id", post_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const parsed = PostsSchema.parse(posts);

  return parsed[0];
};

export const getNestedComments = async ({
  comment_id,
}: {
  comment_id?: number;
}) => {
  const { data: comments, error } = await supabase
    .from("comments")
    .select("*")
    .eq("comment_id", comment_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const parsed = OnlyCommentsSchema.parse(comments);

  return parsed;
};

export const getAllResources = async (page = 1, pageSize = 5) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const {
    data: posts,
    error,
    count,
  } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .range(from, to);

  if (error) {
    throw new CustomError({ message: error.message });
  }

  const parsed = GeneralsPostsSchema.parse(posts || []);

  const totalCount = count ?? 0;
  const hasMore = to + 1 < totalCount;

  return {
    data: parsed,
    hasMore,
  };
};
export const deletePost = async ({ id, user_id }: DeletePost) => {
  const { error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .eq("user_id", user_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }
};
