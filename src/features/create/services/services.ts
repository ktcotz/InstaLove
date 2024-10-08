import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";
import axios, { AxiosProgressEvent } from "axios";
import { GeneralsPostsSchema } from "../../posts/schema/PostsSchema";

type SupabasePost = {
  post_image: File;
  disableComment: boolean;
  disableLike: boolean;
  description: string;
  user_id: string;
  video_url?: string;
  type: "posts" | "reels";
};

type Upload = {
  handleUploadProgress: (progress: AxiosProgressEvent) => void;
};

export const createPost = async ({
  disableComment,
  disableLike,
  description,
  user_id,
  post_image,
  type,
  handleUploadProgress,
}: SupabasePost & Upload) => {
  const imageName = `${type}-${post_image.name}`;

  try {
    await supabase.storage
      .from(user_id)
      .upload(`${type}/${imageName}`, post_image, {
        cacheControl: "3600",
        upsert: true,
      });

    const { data: signedUrl } = await supabase.storage
      .from(user_id)
      .createSignedUrl(`${type}/${imageName}`, 365 * 24 * 60 * 60);


    if (!signedUrl?.signedUrl)
      throw new Error("Something wrong with this file!");

    const config = {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      onUploadProgress: handleUploadProgress,
    };

    const response = await axios.post(
      signedUrl.signedUrl,
      { post_image, expiresIn: 365 * 24 * 60 * 60 },
      config
    );

    if (!response) return;

    const addObject =
      type === "posts"
        ? {
            user_id,
            disableComment,
            disableLike,
            description,
            post_url: signedUrl?.signedUrl,
          }
        : {
            user_id,
            disableComment,
            disableLike,
            description,
            video_url: signedUrl?.signedUrl,
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

    const parsedData = GeneralsPostsSchema.parse(data);

    return parsedData;
  } catch (err) {
    if (err instanceof Error) {
      throw new CustomError({
        message: err.message,
      });
    }
  }
};
