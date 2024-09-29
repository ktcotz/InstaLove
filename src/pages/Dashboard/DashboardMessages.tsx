import { ChatBar } from "../../features/chat/ChatBar";
import { StartChat } from "../../features/chat/StartChat";

export const DashboardMessages = () => {
  return (
    <div className="grid grid-cols-4 grow">
      <ChatBar />
      <div className="col-start-2 -col-end-1">
        <StartChat />
      </div>
    </div>
  );
};
