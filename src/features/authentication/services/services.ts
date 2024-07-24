import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";

type UserCredentials = {
  email: string;
  password: string;
};

export const registerWithPassword = async ({
  email,
  password,
}: UserCredentials) => {
  const { data, error } = await supabase.auth.signUp({
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
