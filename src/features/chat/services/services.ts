import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";
import { UserID } from "../../authentication/services/types";
import { Profile } from "../../profile/schema/ProfilesSchema";
import { GetChatData } from "../queries/useGetChat";
import { ChatSchemaType } from "../schema/ChatSchema";

type SelectedUsers = {
  selectedUsers: Profile[];
};

export const createChat = async ({
  created_by,
  type,
  selectedUsers,
}: ChatSchemaType & SelectedUsers) => {
  if (selectedUsers.length === 1 && selectedUsers[0].user_id === created_by)
    return;

  const { data: chats, error: chatsError } = await supabase
    .from("chat_participants")
    .select("chat_id")
    .eq("user_id", created_by)
    .eq("role", "creator");

  if (chatsError) {
    throw new CustomError({
      message: chatsError.message,
    });
  }

  const chatsUsers = await Promise.all(
    chats.map(async (chat) => {
      const { data } = await supabase
        .from("chat_participants")
        .select("user_id")
        .eq("chat_id", chat.chat_id);

      return data?.map((users) => users.user_id);
    })
  );

  const eachChatUsers = chatsUsers.map((chat) => {
    for (const user of selectedUsers) {
      return chat?.includes(user.user_id) ? chat.sort() : null;
    }
  });

  const actuallyCreatedChats = eachChatUsers.filter((users) => Boolean(users));

  const mappedSelectedIDs = selectedUsers.map((user) => user.user_id).sort();

  const hasCreatedChat = actuallyCreatedChats.map((chat) => {
    if (chat?.length !== mappedSelectedIDs.length) return false;

    return chat.every((user) => mappedSelectedIDs.includes(user));
  });

  const hasCreatedChatIndex = hasCreatedChat.findIndex((chat) => chat);

  if (hasCreatedChatIndex !== -1) {
    return chats[hasCreatedChatIndex].chat_id;
  }

  const { data, error } = await supabase
    .from("chats")
    .insert([{ created_by, type }])
    .select()
    .single();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const mappedUsers = selectedUsers.map((user) => ({
    user_id: user.user_id,
    role: user.user_id === created_by ? "creator" : "normal",
    chat_id: data.id,
  }));

  const { error: participantsError } = await supabase
    .from("chat_participants")
    .insert(mappedUsers)
    .select();

  if (participantsError) {
    throw new CustomError({
      message: participantsError.message,
    });
  }

  return data;
};

export const getChat = async ({ chat_id }: GetChatData) => {
  const { data, error } = await supabase
    .from("chats")
    .select("*")
    .eq("id", chat_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const { data: users, error: usersError } = await supabase
    .from("chat_participants")
    .select("*,user_id(*)")
    .eq("chat_id", chat_id);

  if (usersError) {
    throw new CustomError({
      message: usersError.message,
    });
  }

  return { data, users };
};

export const getChats = async ({ user_id }: UserID) => {
  const { data, error } = await supabase
    .from("chat_participants")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return data;
};
