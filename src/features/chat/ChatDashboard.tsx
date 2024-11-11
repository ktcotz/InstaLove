import { useNavigate, useParams } from "react-router";
import { useGetChat } from "./queries/useGetChat";
import { useEffect, useState } from "react";
import { Users } from "./dashboard/Users";

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
    <div className="relative flex-col md:flex-row flex">
      <div className="grow flex flex-col">
        {data?.users && (
          <Users users={data.users} toggleSidebar={toggleSidebar} />
        )}
        <div className="overflow-y-scroll grow">
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
        className={`transition-all duration-300 overflow-hidden ${
          showSidebar ? "w-[300px] md:w-[200px]" : "w-0"
        }`}
      >
        SIDEBAR
      </div>
    </div>
  );
};
