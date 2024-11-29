import { useNavigate } from "react-router";
import { useGetChat } from "../queries/useGetChat";
import { useEffect } from "react";
import { Users } from "../users/Users";

type ChatProps = {
  chat: number;
};

export const Chat = ({ chat }: ChatProps) => {
  const { data, isLoading } = useGetChat({ chat_id: chat });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !data?.data) {
      navigate(-1);
    }
  }, [data, isLoading, navigate]);

  return data && <Users users={data.users} type="chat" chat={chat} />;
};
