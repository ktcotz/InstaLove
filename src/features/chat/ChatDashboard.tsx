import { useNavigate, useParams } from "react-router";
import { useGetChat } from "./queries/useGetChat";
import { useEffect, useState } from "react";
import { Users } from "./dashboard/Users";
import { ChatSidebar } from "./ChatSidebar";
import { AddChatMessage } from "./dashboard/AddChatMessage";
import { useGetMessages } from "./queries/useGetMessages";
import { Message } from "./messages/Message";
import { IntroChat } from "./dashboard/IntroChat";

export const ChatDashboard = () => {
  const { id } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const { data, isLoading } = useGetChat({ chat_id: Number(id) });
  const { data: messages } = useGetMessages({ chatId: Number(id) });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data?.data.length === 0) {
      navigate(-1);
    }
  }, [data, isLoading, navigate]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-[5] bg-stone-100 md:relative flex-col md:flex-row flex">
      <div className="grow flex flex-col">
        {data?.users && (
          <Users
            name={data.data.name}
            users={data.users}
            toggleSidebar={toggleSidebar}
          />
        )}

        <div className="relative md:static max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-180px)]">
          <div className="overflow-y-scroll h-[calc(100vh-200px)] pb-24">
            {data?.users && <IntroChat users={data.users} chat={data.data} />}
            {messages?.map((message) => {
              return <Message key={message.id} {...message} />;
            })}
          </div>
          <AddChatMessage chatId={Number(id)} />
        </div>
      </div>
      <div
        className={`absolute top-0 left-0 right-0 bottom-0  md:static transition-all duration-300 overflow-hidden ${
          showSidebar ? "w-[250px] sm:w-[400px] md:w-[300px]" : "w-0"
        }`}
      >
        <ChatSidebar />
      </div>
    </div>
  );
};
