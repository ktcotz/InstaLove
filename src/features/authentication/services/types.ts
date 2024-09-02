import { LoginSchema } from "../schema/LoginFormSchema";

export type UserCredentials = LoginSchema;

export type UserPrivate = {
  nickname: string;
  avatar_url?: string;
};

export type UserID = {
  user_id?: string;
};

export type User = UserCredentials & UserPrivate;
