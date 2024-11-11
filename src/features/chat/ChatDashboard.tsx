import { useNavigate, useParams } from "react-router";
import { useGetChat } from "./queries/useGetChat";
import { useEffect, useState } from "react";
import { Users } from "./dashboard/Users";
import { ChatSidebar } from "./ChatSidebar";

export const ChatDashboard = () => {
  const { id } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const { data, isLoading } = useGetChat({ chat_id: Number(id) });
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
          <Users users={data.users} toggleSidebar={toggleSidebar} />
        )}
        <div className="overflow-y-scroll  max-h-[calc(100vh-200px)]">
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
          <h1>asd</h1>
        </div>
      </div>
      <div
        className={`absolute top-0 left-0 right-0 bottom-0 bg-red-500 md:static transition-all duration-300 overflow-hidden ${
          showSidebar ? "w-[250px] sm:w-[400px] md:w-[300px]" : "w-0"
        }`}
      >
        <ChatSidebar />
      </div>
    </div>
  );
};
