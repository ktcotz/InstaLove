import { supabase } from "../../../lib/supabase/supabase";
import { GlobalRoutes } from "../../../typing/routes";
import { CustomError } from "../../../utils/CustomErrors";

type UserCredentials = {
  email: string;
  password: string;
};

type UserExtraData = {
  nickname: string;
};

export const registerWithPassword = async ({
  email,
  password,
  nickname,
}: UserCredentials & UserExtraData) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        user_name: nickname,
        firstName: "",
        lastName: "",
        fullName: "",
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

  return data;
};

export const loginUserByGithub = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:5173/dashboard",
    },
  });

  if (error) {
    throw new CustomError({
      message: error.message,
      code: error.status,
    });
  }
};

export const forgotPassword = async ({
  email,
}: Pick<UserCredentials, "email">) => {
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

export const updatePassword = async ({
  password,
}: Pick<UserCredentials, "password">) => {
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

  return user;
};

export const signout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new CustomError({
      message: error.message,
      code: error.status,
    });
  }
};
