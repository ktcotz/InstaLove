import { supabase } from "../../../lib/supabase/supabase";
import { CustomError } from "../../../utils/CustomErrors";
import { UserID } from "../../authentication/services/types";
import { Profile } from "../../profile/schema/ProfilesSchema";
import { EditChatNameData } from "../edit/EditChatName";
import { AddMessageData } from "../mutations/useAddMessage";
import { AddReactionData } from "../mutations/useAddReaction";
import { DeleteReactionData } from "../mutations/useDeleteReaction";
import { GetChatData } from "../queries/useGetChat";
import { GetMessagesData } from "../queries/useGetMessages";
import { GetMessagesReactions } from "../queries/useGetReactions";
import {
  ChatParticipants,
  ChatSchema,
  ChatSupabaseUsers,
} from "../schema/ChatSchema";
import { LeaveGroupData } from "../utils/ConfirmLeaveGroup";

type SelectedUsers = {
  selectedUsers: Profile[];
};

export const createChat = async ({
  created_by,
  type,
  selectedUsers,
}: { created_by: string; type: "group" | "chat" } & SelectedUsers) => {
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
  const { data: chat, error } = await supabase
    .from("chats")
    .select("*")
    .eq("id", chat_id)
    .single();

  const data = ChatSchema.parse(chat);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  const { data: allUsers, error: usersError } = await supabase
    .from("chat_participants")
    .select("*,user_id(*)")
    .eq("chat_id", chat_id);

  if (usersError) {
    throw new CustomError({
      message: usersError.message,
    });
  }

  const users = ChatSupabaseUsers.parse(allUsers);

  return { data, users };
};

export const getChats = async ({ user_id }: UserID) => {
  const { data: users, error } = await supabase
    .from("chat_participants")
    .select("*")
    .eq("user_id", user_id);

  const parsed = ChatParticipants.parse(users);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return parsed;
};

export const deleteChat = async ({ chat_id }: GetChatData) => {
  const { error: participantsError } = await supabase
    .from("chat_participants")
    .delete()
    .eq("chat_id", chat_id);

  if (participantsError) {
    throw new CustomError({
      message: participantsError.message,
    });
  }

  const { error } = await supabase.from("chats").delete().eq("id", chat_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }
};

export const changeChatName = async ({ chatId, name }: EditChatNameData) => {
  const { data, error } = await supabase
    .from("chats")
    .update({ name })
    .eq("id", chatId)
    .select();

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return data;
};

export const leaveGroup = async ({
  chatId,
  user_id,
}: LeaveGroupData & UserID) => {
  const { error } = await supabase
    .from("chat_participants")
    .delete()
    .eq("chat_id", chatId)
    .eq("user_id", user_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }
};

export const getMessages = async ({ chatId }: GetMessagesData) => {
  const { data, error } = await supabase
    .from("messages")
    .select("*,user_id(*),chat_id(*),reply_user(*)")
    .eq("chat_id", chatId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return data;
};

export const addMessage = async ({
  chatId,
  message,
  userId,
  reply,
}: AddMessageData) => {
  const messageToInsert = reply
    ? [
        {
          chat_id: chatId,
          user_id: userId,
          message,
          reply_user: reply.user?.user_id,
          reply_message: reply.message,
        },
      ]
    : [{ chat_id: chatId, user_id: userId, message }];

  const { error } = await supabase.from("messages").insert(messageToInsert);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }
};

export const addReactionToMessage = async ({
  message_id,
  reaction,
  user_id,
}: AddReactionData) => {
  const { data: react } = await supabase
    .from("messages_reactions")
    .select("*")
    .eq("message_id", message_id)
    .eq("user_id", user_id);

  if (react && react.length > 0) {
    const { data, error } = await supabase
      .from("messages_reactions")
      .update({ reaction })
      .eq("message_id", message_id)
      .eq("user_id", user_id)
      .select();

    if (error) {
      throw new CustomError({
        message: error.message,
      });
    }

    return data;
  } else {
    const { error } = await supabase
      .from("messages_reactions")
      .insert([{ message_id, reaction, user_id }]);

    if (error) {
      throw new CustomError({
        message: error.message,
      });
    }
  }
};

export const getMessagesAllReactions = async ({
  message_id,
}: GetMessagesReactions) => {
  const { data, error } = await supabase
    .from("messages_reactions")
    .select("*,user_id(*),message_id(*)")
    .eq("message_id", message_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }

  return data;
};

export const deleteUserReaction = async ({
  id,
  message_id,
}: DeleteReactionData) => {
  const { error } = await supabase
    .from("messages_reactions")
    .delete()
    .eq("user_id", id)
    .eq("message_id", message_id);

  if (error) {
    throw new CustomError({
      message: error.message,
    });
  }
};
