import { useNavigate } from "react-router";
import { useGetChat } from "../queries/useGetChat";
import { useEffect } from "react";
import { Users } from "./Users";

type ChatProps = {
  chat: any;
};

export const Chat = ({ chat }: ChatProps) => {
  const { data, isLoading } = useGetChat({ chat_id: Number(chat.chat_id) });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data?.data.length === 0) {
      navigate(-1);
    }
  }, [data, isLoading, navigate]);

  return data && <Users users={data.users} type="chat" chat={chat.chat_id} />;
};
