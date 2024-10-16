import { Outlet } from "react-router";
import { ChatBar } from "../../features/chat/ChatBar";

export const DashboardMessages = () => {
  return (
    <div className="grid grid-rows-[150px_1fr] md:grid-rows-1 md:grid-cols-4 grow">
      <ChatBar />
      <div className="col-start-2 -col-end-1">
        <Outlet />
      </div>
    </div>
  );
};
