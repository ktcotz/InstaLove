import { supabase } from "../../../lib/supabase/supabase";
import { GlobalRoutes } from "../../../typing/routes";
import { CustomError } from "../../../utils/CustomErrors";
import { ProfileSchema } from "../../profile/schema/ProfilesSchema";
import { User, UserCredentials, UserID, UserPrivate } from "./types";

export const registerWithPassword = async ({
  email,
  password,
  nickname,
}: User) => {
  const { data: users } = await supabase
    .from("users")
    .select("*")
    .eq("user_name", nickname);

  if (users && users.length > 0) {
    throw new CustomError({
      message: "Username is taken.",
      code: 422,
    });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        user_name: nickname,
        fullName: "",
        type: "public",
        avatar_url:
          "https://ofekoesnmxxjzvhfwopy.supabase.co/storage/v1/object/sign/avatars/public/user.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL3B1YmxpYy91c2VyLnBuZyIsImlhdCI6MTcyMjE1NzEyNywiZXhwIjoxNzUzNjkzMTI3fQ.KJW11PWPaAQzQONBtn3u2jaAUCnnkUhMrwdnawewrlQ&t=2024-07-28T08%3A58%3A46.693Z",
      },
    },
  });

  if (error) {
    throw new CustomError({
      message: error.message,
      code: error.status,
    });
  }

  addUser({ nickname, user_id: data.user?.id });
  createUserBucket({ user_id: data.user?.id });

  return data;
};

const createUserBucket = async ({ user_id }: UserID) => {
  if (!user_id) return;

  const { error } = await supabase.storage.createBucket(user_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }
};

const addUser = async ({
  nickname,
  user_id,
  avatar_url,
}: UserPrivate & UserID) => {
  if (!user_id) return;

  const { data: users } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user_id);

  if (users!.length > 0) return;

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        user_name: nickname,
        user_id,
        fullName: "",
        loggedIn: null,
        unLoggedIn: null,
        biogram: "",
        avatar_url: avatar_url
          ? avatar_url
          : "https://ofekoesnmxxjzvhfwopy.supabase.co/storage/v1/object/sign/avatars/public/user.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL3B1YmxpYy91c2VyLnBuZyIsImlhdCI6MTcyMjE1NzEyNywiZXhwIjoxNzUzNjkzMTI3fQ.KJW11PWPaAQzQONBtn3u2jaAUCnnkUhMrwdnawewrlQ&t=2024-07-28T08%3A58%3A46.693Z",
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

export const loginUser = async ({ email, password }: UserCredentials) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new CustomError({
      message: error.message,
      code: error.status,
    });
  }
  if (data.user) {
    const { error: updateError } = await supabase
      .from("users")
      .update({ loggedIn: new Date() })
      .eq("user_id", data.user.id);

    if (updateError) {
      throw new CustomError({
        message: updateError.message,
      });
    }
  }

  return data;
};

export const forgotPassword = async ({ email }: Pick<User, "email">) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `http://localhost:5173${GlobalRoutes.ResetPassword}`,
  });

  if (error) {
    throw new CustomError({
      message: error.message,
      code: error.status,
    });
  }

  return data;
};

export const updatePassword = async ({ password }: Pick<User, "password">) => {
  const { data, error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    throw new CustomError({
      message: error.message,
      code: error.status,
    });
  }

  return data;
};

export const getUser = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw new CustomError({
      message: error.message,
      code: error.status,
    });
  }

  const user = data.session?.user;

  return user ?? null;
};

export const getUserByID = async ({ user_id }: UserID) => {
  const { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const parsed = ProfileSchema.parse(user[0]);

  return parsed;
};

export const signout = async ({ user_id }: UserID) => {
  const { error: updateError } = await supabase
    .from("users")
    .update({ unLoggedIn: new Date() })
    .eq("user_id", user_id)
    .select();

  if (updateError) {
    throw new CustomError({
      message: updateError.message,
    });
  }

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new CustomError({
      message: error.message,
      code: error.status,
    });
  }
};

export const loggedOut = async ({ user_id }: UserID) => {
  const { error: updateError } = await supabase
    .from("users")
    .update({ unLoggedIn: new Date() })
    .eq("user_id", user_id)
    .select();

  if (updateError) {
    throw new CustomError({
      message: updateError.message,
    });
  }
};
