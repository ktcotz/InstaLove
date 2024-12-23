import { useNavigate, useParams } from "react-router";
import { useGetChat } from "./queries/useGetChat";
import { useEffect, useState } from "react";
import { ChatSidebar } from "./ChatSidebar";
import { AddChatMessage } from "./messages/AddChatMessage";
import { useGetMessages } from "./queries/useGetMessages";
import { Message } from "./messages/Message";
import { IntroChat } from "./dashboard/IntroChat";
import { Users } from "./users/Users";
import { MessagesContextProvider } from "./messages/context/MessagesContext";
import { MessagesLoadingSkeleton } from "./messages/MessagesLoadingSkeleton";

export const ChatDashboard = () => {
  const { id } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const { data, isLoading } = useGetChat({ chat_id: Number(id) });
  const { data: messages, isLoading: isMessagesLoading } = useGetMessages({
    chatId: Number(id),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !data?.data) {
      navigate(-1);
    }
  }, [data, isLoading, navigate]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <MessagesContextProvider>
      <div className="absolute top-0 left-0 right-0 bottom-0 z-[5] bg-stone-100 md:relative flex-col md:flex-row flex dark:bg-stone-950">
        <div className="grow flex flex-col">
          {data?.users && (
            <Users
              name={data.data.name}
              users={data.users}
              toggleSidebar={toggleSidebar}
            />
          )}

          <div className="relative md:static max-h-screen">
            <div className="overflow-y-scroll h-[calc(100vh-215px)] md:h-[calc(100vh-175px)] pb-24">
              {data?.users && <IntroChat users={data.users} chat={data.data} />}
              <div className="flex flex-col gap-4 px-4">
                {isMessagesLoading && <MessagesLoadingSkeleton />}
                {messages?.map((message) => {
                  return <Message key={message.id} {...message} />;
                })}
              </div>
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
    </MessagesContextProvider>
  );
};
